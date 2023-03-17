import { useState } from "react";
import { db } from "@/firebase/config";
import { collection, query, where, getDocs, deleteDoc, writeBatch, doc, increment } from "firebase/firestore";

type DeleteTradeHook = {
  isPending: boolean;
  error: string | undefined;
  success: boolean;
  deletePendingTrades: () => Promise<void>;
};

export const useDeletePendingTrades = (userEmail: string): DeleteTradeHook => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState(false);

  const deletePendingTrades = async () => {
    setIsPending(true);
    setSuccess(false);
    setError(undefined);

    const tradesCollRef = collection(db, "trades");
    const batch = writeBatch(db);

    // Find all trades for this user on the current day that are still pending
    const today = new Date();
    const todayObject = { day: today.getDate(), month: today.getMonth() + 1, year: today.getFullYear() }
    const userTradesQuery = query(tradesCollRef, where("email", "==", userEmail), where("date.day", "==", todayObject.day),
      where("date.month", "==", todayObject.month),
      where("date.year", "==", todayObject.year),
      where("isPending", "==", true)
    );

    const userTradesSnapshot = await getDocs(userTradesQuery);

    const tradeAmounts: number[] = [];
    userTradesSnapshot.forEach((doc) => {
      tradeAmounts.push(doc.data().amount);
    });

    const totalAmount = tradeAmounts.reduce((total, amount) => total + amount, 0);


    userTradesSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    const userDocRef = doc(collection(db, "profile"), userEmail);
    batch.update(userDocRef, { "bal.balance": increment(totalAmount) });

    try {
      await batch.commit();
      setSuccess(true);
      setIsPending(false);
    } catch (err: any) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { isPending, error, success, deletePendingTrades };
};
