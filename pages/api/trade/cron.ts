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
    if(trade.progress < 24) {
      batch.update(tradeRef, {progress: increment(1)})
    }

    if(trade.progress === 24) {
      batch.update(tradeRef, {isPending: false})

      // Update user profile
      const profileRef = doc(profilesRef, trade.email);
      const profit = trade.amount * 0.0357;

      const updateProfileData = {
        "bal.balance": increment(trade.amount + profit),
        "bal.profit": increment(profit),
      };

      batch.update(profileRef, updateProfileData);
    }
  });

  try {
  await batch.commit();
  res.status(200).json({ message: 'Trade updates successfully processed' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export default handler
