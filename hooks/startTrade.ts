import { useState } from "react"
import { useFirestore } from "./useFirestore"


interface TradeData {
  amount: number,
  doc: any
}


export default function startTrade() {
  const [error, setError] = useState<string|null>(null)
  const [isPending, setIsPending] = useState(false)
  const [success, setSuccess] = useState<boolean|string>(false)
  const { addDocument, res } = useFirestore('trades')

  const initiateTrade = async (data: TradeData) => {
    setIsPending(true)
    const date = new Date();
    const dateObject = { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear()}

    if(!data.doc) return setError("Can't place trade at the moment")
    if(data.amount <= 0) return setError("Minimum amount must be > 0")
    if(data.doc.bal.balance < data.amount) return setError("Insufficient balance")

    addDocument({
      date: dateObject,
      amount:  data.amount,
      isPending: false,
      email: data.doc.email,
      progress: 0
    })


    try {
      if(res.error === null && !res.isPending) {

        const response = await fetch(`/api/trade`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          const data = await response.json();
          setSuccess(data.message)
        } else {
          setSuccess(false)
        }

      }
    } catch (error: any) {
      setError(error.message)
    }

    setIsPending(false)
  }


  return { error, isPending, success, initiateTrade}
}