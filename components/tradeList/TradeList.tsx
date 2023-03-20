import s from './TradeList.module.css';
import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/config';

interface dateObj {
  year: number,
  month: number,
  day: number,
}

interface tradeDoc {
  id: string,
  amount: number,
  progress: number,
  isPending: boolean,
  date: dateObj
}

type list =  Array<tradeDoc>

export function TradeList({ user }: any): any {
  const [trades, setTrades] = useState<list|any>([]);
  const q = query(collection(db, 'trades'), where('email', '==', user.email));

  useEffect(() => {
    async function fetchTrades() {
      const unsubscribe = onSnapshot(q, (snapshot) => {
          let results: Array<object> = []
          snapshot.forEach(doc => results.push({ ...doc.data(), id: doc.id}))
          setTrades(results);
        },
        (error) => {
          console.log(error.message)
        });
      
        return () => unsubscribe()
    }

    fetchTrades();
    // fetch(`/api/trade/cron`).then(res => res.json()).then(data => console.log(data))
  }, [user.email]);

  return (trades.length > 0 &&
    <div className={s.ctn}>
      {trades.map((trade: tradeDoc) => (
          <div key={trade.id}  className={s.wrapper}>
            <div className={s.info}>
              <div>Date: <span>{trade.date.day}.{trade.date.month}.{trade.date.year}</span></div>
              <div>Amount: <span>${trade.amount}</span></div>
              <div>Duration: <span>{trade.progress}</span></div>
            </div>
            <ProgressBar value={trade.progress} max={24} />
          </div>
      ))}
    </div>
  );
}

export function ProgressBar({ value, max }: { value: number; max: number }) {
  const percent = (value / max) * 100;

  return (
    <div
      style={{
        backgroundColor: '#e0e0de',
        height: '8px',
        borderRadius: '10px',
        width: '100%',
      }}
    >
      <div
        style={{
          height: '100%',
          borderRadius: '10px',
          width: `${percent}%`,
        }}
        className={s.bar}
      />
    </div>
  );
}
