import { TextField } from '@mui/material'
import { useState } from 'react'
import s  from './Withdraw.module.scss'
import { doc, writeBatch, collection } from 'firebase/firestore';
import { db } from '@/firebase/config'

export default function Withdraw({userDoc}: any | {doc: any}) {
  const [amount, setAmount] = useState<number | string>(0)
  const [wallet, setWallet] = useState<string>('')
  const [error, setError] = useState<null | string>(null)
  const [isPending, setIsPending] = useState(false)

  const handleTrade = (e: any) => {
    e.preventDefault()
    setIsPending(true)
    setError(null)

    if (amount < 20) return setError('Amount must be greater than $10')
      const data = { amount: Number(amount), wallet,  userDoc}

      // check if user has enough balance
      if (data.amount > userDoc.balance) {
        setError('Insufficient balance')
        setIsPending(false)
      }

      // update balance
      try {
        updateBalance(userDoc, data.amount, data.wallet)
      } catch (error: any) {
        setError(error.message)
      }
      setIsPending(false)
      setAmount(0)
      setWallet('')
      setError(null)
  }


  return (
    <div className={s.ctn}>
      <h1>Withdraw</h1>

      <form className={s.form}>
      <TextField label="Amount" InputLabelProps={{ shrink: true }} type="number" onChange={e => setAmount(e.target.value)} value={amount}/>
      <TextField label="Wallet" InputLabelProps={{ shrink: true }} type="text" onChange={e => setWallet(e.target.value)} value={wallet}/>
          {!isPending && <button style={{...overwrite}} className='bigBtn full' onClick={handleTrade}>Start Trade</button>}
          {isPending && <button style={{...overwrite}} className='bigBtn full'>Loading...</button>}
          {error && <p className='formError'>{error}</p>}
      </form>
    </div>
  )
}




const span2 = {
  fontSize: "1.5em",
  paddingRight: "1em",
}

const overwrite = {
  background: "none",
  border: "1px solid #000000",
}



const updateBalance = async (userDoc: any, amount: number, wallet: string) => {
  const userDocRef = doc(collection(db, "profile"), userDoc.email);
  const newBalance = userDoc.bal.balance - amount;
  const batch = writeBatch(db);

  batch.update(userDocRef, { "bal.balance": newBalance });

  const trsRef = doc(collection(db, 'transactions'))
  batch.set(trsRef, { wallet, amount, user: userDoc.email, type: 'withdrawal', timestamp: new Date().toISOString() });

  await batch.commit();
};