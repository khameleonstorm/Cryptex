import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase/config";
import { collection, doc, query, where, getDocs, writeBatch } from "firebase/firestore";

type Data = {
  message: string
}


async function handler( req: NextApiRequest, res: NextApiResponse<Data>) {
  const date = new Date();
  const {user, amount } = req.body
  const newBalance = user.bal.balance - amount;
  const batch = writeBatch(db)
  const tradeRef = collection(db, "trades")
  const userRef = doc(db, "profile", user.email);
  const newTradeDoc = {date, amount, isPending: true, email: user.email, progress: 0}
  const userTQ = query(tradeRef, where("email", "==", user.email), where("date.day", "==", date));


  try {
    // Check if Max number of trade per day is 3
    const userTSS= await getDocs(userTQ);
    if (userTSS.size >= 3) return res.status(400).json({ message: "Max trades per day is 3"});
    
    // check the trade from the previous day 
    date.setDate(date.getDate() - 1);
    const Q = query(tradeRef, where("email", "==", user.email), where("date", "==", date));
    const prevTrade = await getDocs(Q);

    if (prevTrade.size > 0) {
      prevTrade.forEach(async (doc) => {
        const { isPending } = doc.data();
        if (isPending) return res.status(400).json({ message: "Uresolved trades from the prev day"});
      })
    }

    const newTradeRef = doc(tradeRef)
    batch.update(userRef, { "bal.balance":  newBalance});
    batch.set(newTradeRef, newTradeDoc);
    
    await batch.commit();
    
    return res.status(200).json({ message: "Done"})
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

