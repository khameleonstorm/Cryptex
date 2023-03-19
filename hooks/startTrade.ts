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

    if(!data.doc) return throwError("Can't place trade at the moment")
    if(data.amount <= 0) return throwError("Minimum amount must be > 0")
    if(data.doc.bal.balance < data.amount) return throwError("Insufficient balance")

    

    try {
      const docRef = {...data}
        const response = await fetch(`/api/trade/placeTrade`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(docRef)
        });

        const resData = await response.json();

        if (response.ok) {
          setSuccess(true)
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