import type { NextApiRequest, NextApiResponse } from 'next'
import cron from 'node-cron';
import { db } from "@/firebase/config";
import { collection, doc, updateDoc, query, where, getDocs, getDoc, increment, writeBatch } from "firebase/firestore";

type Data = {
  message: string
}


async function handler( req: NextApiRequest, res: NextApiResponse<Data>) {
  const {doc: currentUser, amount, date } = req.body
  const newBalance = currentUser.bal.balance - amount;
  const batch = writeBatch(db)
  const profit = amount * 0.0357;
  const tradeRef = collection(db, "trades")
  const userRef = doc(db, "profile", currentUser.email);
  const newTradeDoc = {date, amount, isPending: true, email: currentUser.email, progress: 0}
  const userTradesQuery = query(tradeRef, where("email", "==", currentUser.email),where("date.day", "==", date.day), where("date.month", "==", date.month), where("date.year", "==", date.year));

  try {
    // Check if Max number of trade per day is 3
    const userTSS= await getDocs(userTradesQuery);
    if (userTSS.size >= 3) return res.status(400).json({ message: "Max number of trade per day is 3"});
    
    // check the trade from the previous day
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const prevD = { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear()}
    const dateQuery = query(tradeRef, where("email", "==", currentUser.email), where("date.day", "==", prevD.day), where("date.month", "==", prevD.month), where("date.year", "==", prevD.year));

    const prevTrade = await getDocs(dateQuery);

    if (prevTrade.size > 0) {
      prevTrade.forEach(async (doc) => {
        const { isPending } = doc.data();
        if (isPending) return res.status(400).json({ message: "Uresolved trades from the previous day"});
      })
    }

    const newTradeRef = doc(tradeRef)
    batch.update(userRef, { "bal.balance":  newBalance});
    batch.set(newTradeRef, newTradeDoc);

    
    // Schedule task to run every 1 minutes
    const task = cron.schedule(' */20 * * * * *', async () => { 
      const tradeDoc = await getDoc(doc(db, "trades", newTradeRef.id));
      const userDoc = await getDoc(userRef);

      if (tradeDoc.exists() && userDoc.exists()) {
        const { progress } = tradeDoc.data();
        console.log("pass2")
    
        if (progress >= 23) {
          console.log("pass3")
            await updateDoc(userDoc.ref, { "bal.profit": increment(profit), "bal.balance": increment(profit + amount) });
            await updateDoc(tradeDoc.ref, { "progress": 24, "isPending": false });
          
          task.stop() // Stop the cron job
        } else { await updateDoc(tradeDoc.ref, { "progress": progress + 1 }) }

      } else { task.stop() }
    }); 

    await batch.commit();

    task.start();    // Start the task
    
    return res.status(200).json({ message: "Done"})
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export default handler
