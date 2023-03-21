import { TextField } from '@mui/material'
import { useState } from 'react'
import s  from './Withdraw.module.css'
import { doc, writeBatch, collection, increment } from 'firebase/firestore';
import { db } from '@/firebase/config'

export default function Withdraw({userDoc}: any | {doc: any}) {
  const [amount, setAmount] = useState<number | string>(0)
  const [wallet, setWallet] = useState<string>('')
  const [error, setError] = useState<null | string>(null)
  const [isPending, setIsPending] = useState(false)

  const handleWithdraw = (e: any) => {
    e.preventDefault()
    setIsPending(true)
    setError(null)

    if(amount === 0 || amount === '' || amount === null) {
      setError('Please enter an amount')
      setTimeout(() => setError(null), 4000)
      setIsPending(false)
      return
    }

    if(wallet === '' || wallet === null) {
      setError('Please enter a wallet address')
      setTimeout(() => setError(null), 4000)
      setIsPending(false)
      return
    }

    if (amount < 20) {
      setError('Amount must be greater than $20')
      setTimeout(() => setError(null), 4000)
      setIsPending(false)
      return
    }
    const data = { amount: Number(amount), wallet,  userDoc}

    // check if user has enough balance
    if (data.amount > userDoc.balance) {
      setError('Insufficient balance')
      setTimeout(() => setError(null), 4000)
      setIsPending(false)
      return
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
          {!isPending && <button style={{...overwrite}} className='bigBtn full' onClick={handleWithdraw}>Withdraw</button>}
          {isPending && <button style={{...overwrite}} className='bigBtn full'>Loading...</button>}
          {error && <p className='formError'>{error}</p>}
      </form>
    </div>
  )
}


const overwrite = {
  background: "none",
  border: "1px solid #000000",
}


const updateBalance = async (userDoc: any, amount: number, wallet: string) => {
  const userDocRef = doc(collection(db, "profile"), userDoc.email);
  const newBalance = userDoc.bal.balance - amount;
  const batch = writeBatch(db);

  batch.update(userDocRef, { "bal.balance": newBalance, "bal.totalWithdrawal": increment(amount)});

  const trsRef = doc(collection(db, 'transactions'))
  batch.set(trsRef, { wallet, amount, email: userDoc.email, type: 'withdrawal', date: new Date().toISOString() });

  await batch.commit();
};