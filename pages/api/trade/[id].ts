import type { NextApiRequest, NextApiResponse } from 'next'
import cron from 'node-cron';
import { db } from "@/firebase/config";
import { collection, doc, updateDoc, query, where, getDocs, getDoc, addDoc, increment } from "firebase/firestore";

type Data = {
  message: string
}


async function handler( req: NextApiRequest, res: NextApiResponse<Data>) {
  const {doc: currentUser, amount, date } = req.body
  const profit = amount * 0.0357;
  const tradeCollRef = collection(db, "trades")
  const userRef = doc(db, "profile", currentUser.email);
  const newTradeDoc = {date, amount, isPending: true, email: currentUser.email, progress: 0}
  const userTradesQuery = query(tradeCollRef, where("email", "==", currentUser.email),where("date.day", "==", date.day), where("date.month", "==", date.month), where("date.year", "==", date.year));

  try {
    // Check if Max number of trade per day is 3 and the trades from the previos day is not pending
    const userTSS= await getDocs(userTradesQuery);
    if (userTSS.size >= 3) return res.status(400).json({ message: "Max number of trade per day is 3"});
    
    // check the trade from the previous day
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const prevD = { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear()}
    const dateQuery = query(tradeCollRef, where("email", "==", currentUser.email), where("date.day", "==", prevD.day), where("date.month", "==", prevD.month), where("date.year", "==", prevD.year));

    const prevTrade = await getDocs(dateQuery);

    if (prevTrade.size > 0) {
      prevTrade.forEach(async (doc) => {
        const { isPending } = doc.data();
        if (isPending) return res.status(400).json({ message: "You have a pending trade from the previous day"});
      })
    }


    const tradeDocRef = await addDoc(tradeCollRef, newTradeDoc);
    
    // Schedule task to run every 30 seconds
    const task = cron.schedule(' */1 * * * *', async () => { 
      const tradeDoc = await getDoc(doc(db, "trades", tradeDocRef.id));
      const userDoc = await getDoc(userRef);

      if (tradeDoc.exists() && userDoc.exists()) {
        const { progress } = tradeDoc.data();
    
        if (progress >= 23) {
            await updateDoc(userDoc.ref, { "bal.profit": increment(profit), "bal.balance": increment(profit + amount) });
            await updateDoc(tradeDoc.ref, { "progress": 24, "isPending": false });
          
          task.stop() // Stop the cron job
        } else { await updateDoc(tradeDoc.ref, { "progress": progress + 1 }) }

      } else { task.stop() }
    }); 

    // Start the task
    task.start();
    

    return res.status(200).json({ message: "Done"})
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export default handler
