import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase/config";
import { collection, doc, updateDoc, query, where, getDocs, getDoc, addDoc, increment } from "firebase/firestore";

type Data = {
  message: string
}


async function handler( req: NextApiRequest, res: NextApiResponse<Data>) {
  const {doc: userDoc, amount, date } = req.body
  const profit = amount * 0.0357;
  const tradeCollRef = collection(db, "trades")
  const userRef = doc(db, "profile", userDoc.email);
  const newTradeDoc = {date, amount, isPending: true, email: userDoc.email, progress: 0}
  const userTradesQuery = query(tradeCollRef, where("email", "==", userDoc.email),
   where("date.day", "==", date.day), 
   where("date.month", "==", date.month), 
   where("date.year", "==", date.year));

  try {
    // Check if Max number of trade per day is 3 and the trades from the previos day is not pending
    const userTSS= await getDocs(userTradesQuery);
    if (userTSS.size >= 3) return res.status(400).json({ message: "Max number of trade per day is 3"});
    
    // check the trade from the previous day
    const prevDay = new Date();
    prevDay.setDate(prevDay.getDate() - 1);
    const prevDayObject = { day: prevDay.getDate(), month: prevDay.getMonth() + 1, year: prevDay.getFullYear()}
    const prevDayQuery = query(tradeCollRef, where("email", "==", userDoc.email),
    where("date.day", "==", prevDayObject.day),
    where("date.month", "==", prevDayObject.month),
    where("date.year", "==", prevDayObject.year));
    const prevDayTSS = await getDocs(prevDayQuery);
    if (prevDayTSS.size > 0) {
      prevDayTSS.forEach(async (doc) => {
        const { isPending } = doc.data();
        if (isPending) return res.status(400).json({ message: "You have a pending trade from the previous day"});
      })
    }


    const tradeDocRef = await addDoc(tradeCollRef, newTradeDoc);

    // Schedule the timeout
    const task: any = setInterval(async () => {
      const tradeDoc = await getDoc(doc(db, "trades", tradeDocRef.id));

      if(tradeDoc.exists()){
      const { progress } = tradeDoc.data();

      if (progress >= 24) {
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          await updateDoc(userDoc.ref, { "bal.profit": increment(profit), "bal.balance": increment(profit + amount) });
          await updateDoc(tradeDoc.ref, { "progress": 24, "isPending": false });
        }
        
        clearInterval(task);
      } else {
        await updateDoc(tradeDoc.ref, { "progress": progress + 1 });
      }
    }
    }, 3600000);

    // Schedule the profit update after 24 hours
    await new Promise<void>((resolve) => {
      setTimeout(async () => {
        const userDoc = await getDoc(userRef);
        const tradeDoc = await getDoc(doc(db, "trades", tradeDocRef.id));
        if (userDoc.exists()) {
          await updateDoc(userDoc.ref, { "bal.profit": increment(profit), "bal.balance": increment(profit + amount) });
          await updateDoc(tradeDoc.ref, { "progress":24, "isPending": false });
          clearInterval(task); // destroy the task
        }
        resolve();
      }, 86400000);
    });

    return res.status(200).json({ message: "Success"})
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export default handler
