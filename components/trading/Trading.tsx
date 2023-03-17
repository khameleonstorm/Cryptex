import { TextField } from '@mui/material';
import { useState } from 'react';
import BigChart from '../bigChart/BigChart';
import s from './Trading.module.css';
import { useRouter } from 'next/router';
import startTrade from '@/hooks/startTrade';
import { TbSquareRoundedCheckFilled } from "react-icons/tb"
import CloseTrade from '../closeTrade/CloseTrade';

type doc =  {[key: string]: {[key: string]: {[key: string]: number}}}

export default function Trading({doc}: doc | any) {
  const [page, setPage] = useState(1);
  const [amount, setAmount] = useState<string|number>(0);
  const navigate = useRouter();
  const { error, isPending, success, initiateTrade } = startTrade();


  const handleNavigate = () => {
    navigate.push("/dashboard/home");
  }

  const handleTrade = () => {
    const data = { amount: Number(amount), doc }
    console.log(data)
    initiateTrade(data);
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
            <button className='bigBtn full' onClick={()=> setPage(3)}>Close Trade</button>
          </div>
        </div>
      }

      {page === 2 &&
        <div className={s.trade2}>
          {success &&
          <div className={s.successModal}>
            <p className='formSuccess'>Trade initiated and will be completed in 24 hours</p>
            <TbSquareRoundedCheckFilled />
            <button style={{...overwrite}} className='bigBtn full' onClick={handleNavigate}><span style={{...span2}}>&larr;</span> Back To Dashboard </button>
          </div>
          }
          
          <h2>Trade</h2>
          <TextField label="Amount" InputLabelProps={{ shrink: true }} type="number" onChange={e => setAmount(e.target.value)} value={amount}/>
          {!isPending && <button style={{...overwrite}} className='bigBtn full' onClick={handleTrade}>Start Trade</button>}
          {isPending && <button style={{...overwrite}} className='bigBtn full'>Loading...</button>}
          {error && <p className='formError'>{error}</p>}
          <button style={{...overwrite}} className='bigBtn full' onClick={handleNavigate}><span style={{...span2}}>&larr;</span> Back To Dashboard </button>
        </div>
      }

      {page === 3 &&
        <div className={s.trade3}>
          <CloseTrade />
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