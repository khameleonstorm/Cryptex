import { db } from "@/firebase/config"
import { doc, updateDoc } from "firebase/firestore"
import { useState } from "react"


interface TradeData {
  amount: number,
  doc: any,
}


export default function startTrade() {
  const [error, setError] = useState<string|null>(null)
  const [isPending, setIsPending] = useState(false)
  const [success, setSuccess] = useState<boolean|string>(false)

  const throwError = (message: string) => {
    setError(message)
    setIsPending(false)

    setTimeout(() => {
      setError(null)
    }, 3000)
  }

  const initiateTrade = async (data: TradeData) => {
    setIsPending(true)
    setError(null)
    const date = new Date();
    const dateObject = { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear()}

    if(!data.doc) return throwError("Can't place trade at the moment")
    if(data.amount <= 0) return throwError("Minimum amount must be > 0")
    if(data.doc.bal.balance < data.amount) return throwError("Insufficient balance")

    

    try {
      // Deduct the trade amount from user's balance
      const newBalance = data.doc.bal.balance - data.amount;
      const userDocRef = doc(db, "profile", data.doc.email);
      
      const docRef = {...data, date: dateObject}
        const response = await fetch(`/api/trade/${data.doc.uid}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(docRef)
        });

        const resData = await response.json();

        if (response.ok) {
          setSuccess(true)
          await updateDoc(userDocRef, { "bal.balance": newBalance });
        } else {
          setSuccess(false)
          throwError(resData.message)
        }
    } catch (error: any) {
      throwError(error.message)
      console.log(error.message)
    }

    setIsPending(false)
  }


  return { error, isPending, success, initiateTrade}
}