import { TextField } from '@mui/material';
import { useState } from 'react';
import BigChart from '../bigChart/BigChart';
import s from './Trading.module.css';
import { useRouter } from 'next/router';

type acc = Array<object>
type doc =  {[key: string]: {[key: string]: {[key: string]: number}}}

export default function Trading({doc}: doc | any) {
  const [page, setPage] = useState(1);
  const [amount, setAmount] = useState<string|number>(0);
  const [error, setError] = useState<string|null>(null)
  const navigate = useRouter();


  const handleNavigate = () => {
    navigate.push("/dashboard");
  }

  const startTrade = () => {
    setError(null)
    
    console.log(amount, )
    fetch("/api/trade")
    .then(res => res.json())
    .then(data => console.log(data))
    
    if(amount < 10) return setError("Minimum amount is $10")
    if(doc?.bal.balance < amount) return setError("Insufficient balance")
  }


  return (
    <div className={s.container}>
      <div className={s.chart}>
        <BigChart />
      </div>
      {page === 1 &&
        <div className={s.trade1}>
          <p>Asset <br/> <span>USDT</span></p>
          <div className={s.BS}>
            <p>Buy Rate<br/><span>$1.000</span></p>
            <p>Sell Rate<br/><span>$1.015</span></p>
          </div>
  
          <p>Number Of Trades Per Day<br/><span>3 Trades</span></p>
  
          <div className={s.note}>
            <p>
              Trades completes after 24 hours and automatically 
              renews itself until it&apos;s closed.
            </p>
          </div>
  
          <div className={s.btns}>
            <button className='bigBtn full' onClick={()=> setPage(2)}>Open Trade</button>
            <button className='bigBtn full'>Close Trade</button>
          </div>
        </div>
      }

      {page === 2 &&
        <div className={s.trade2}>
          <h2>Trade</h2>
          <TextField label="Amount" InputLabelProps={{ shrink: true }} type="number" onChange={e => setAmount(e.target.value)} value={amount}/>
          <button style={{...overwrite}} className='bigBtn full' onClick={startTrade}>Start Trade</button>
          <button style={{...overwrite}} className='bigBtn full' onClick={handleNavigate}><span style={{...span2}}>&larr;</span> Back To Dashboard </button>
        </div>
      }
    </div>
  );
}




const span2 = {
  fontSize: "1.5em",
  paddingRight: "1em",
}

const overwrite = {
  background: "none",
  border: "1px solid #000000",
}