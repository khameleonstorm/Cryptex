import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase/config";
import { collection, doc, query, where, getDocs, writeBatch, increment } from "firebase/firestore";

type Data = {
  message: string
}


async function handler( req: NextApiRequest, res: NextApiResponse<Data>) {
  const batch = writeBatch(db)
  const tradesRef = collection(db, 'trades');
  const profilesRef = collection(db, 'profile');
  const q = query(tradesRef, where('isPending', '==', true));
  const querySnapshot = await getDocs(q);
  const pendingTrades = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  pendingTrades.forEach((trade: any) => {
    const tradeRef = doc(tradesRef, trade.id);
    if(trade.progress <= 1440) {
      batch.update(tradeRef, {progress: increment(1)})
    }
  })

  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 1000);

  const tradesToUpdate = pendingTrades.filter((trade: any) => {
    const tradeDate = new Date(trade.date.year, trade.date.month, trade.date.day, trade.date.hours, trade.date.minutes, trade.date.seconds);
    return tradeDate <= twentyFourHoursAgo;
  });

  tradesToUpdate.forEach((trade: any) => {
    const tradeRef = doc(tradesRef, trade.id);
    batch.update(tradeRef, { isPending: false});

    // Update user profile
    const profileRef = doc(profilesRef, trade.id);
    const profit = trade.amount * 0.0357;

    const updateProfileData = {
      "bal.balance": increment(trade.amount + profit),
      "bal.profit": increment(profit),
    };

    batch.update(profileRef, updateProfileData);
  });

  try {
  await batch.commit();
  res.status(200).json({ message: 'Trade updates successfully processed' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export default handler
