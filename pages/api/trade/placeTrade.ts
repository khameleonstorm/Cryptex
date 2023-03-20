import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase/config";
import { collection, doc, query, where, getDocs, writeBatch } from "firebase/firestore";

type Data = {
  message: string
}

interface dateObj {[key: string]: number}


async function handler( req: NextApiRequest, res: NextApiResponse<Data>) {
  if (!req.body || !req.body.doc || !req.body.amount) {
    return res.status(400).json({ message: "Invalid request body" });
  }
  
  const {doc: user, amount } = req.body;
  const newDate = new Date(); 
  const date: dateObj = {
    seconds: newDate.getTime() / 1000,
    minutes: newDate.getMinutes(),
    hours: newDate.getHours(),
    day: newDate.getDate(),
    month: newDate.getMonth()+ 1,
    year: newDate.getFullYear()
  }
  const newBalance = user.bal.balance - amount;
  const batch = writeBatch(db)
  const tradeRef = collection(db, "trades")
  const userRef = doc(db, "profile", user.email);
  const newTradeDoc = {date, amount, isPending: true, email: user.email}
  const userTQ = query(tradeRef, where("email", "==", user.email), 
  where("date.day", "==", date.day), 
  where("date.month", "==", date.month), 
  where("date.year", "==", date.year));


  try {
    // Check if Max number of trade per day is 3
    const userTSS= await getDocs(userTQ);
    if (userTSS.size >= 3) return res.status(400).json({ message: "Max trades per day is 3"});
    
    // check the trade from the previous day 
    const prevDate = new Date(newDate.getTime() - 24 * 60 * 60 * 1000);
    const prevDateObj: dateObj = {
      seconds: prevDate.getTime() / 1000,
      minutes: prevDate.getMinutes(),
      hours: prevDate.getHours(),
      day: prevDate.getDate(),
      month: prevDate.getMonth() + 1,
      year: prevDate.getFullYear()
    }
    const Q = query(tradeRef, where("email", "==", user.email), 
    where("date.day", "==", prevDateObj.day), 
    where("date.month", "==", prevDateObj.month), 
    where("date.year", "==", prevDateObj.year));

    const prevTrade = await getDocs(Q);

    if (prevTrade.size > 0) {
      prevTrade.forEach(async (doc) => {
        const { isPending } = doc.data();
        if (isPending) return res.status(400).json({ message: "Unresolved trades from the prev day"});
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

export default handler