import s from './TradeList.module.css';
import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/config';

interface dateObj {[key: string]: number}

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
    async function getTrades() {
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const results: tradeDoc[] = [];
      
      snapshot.forEach((doc) => {
        const data = doc.data() as tradeDoc;
        const date = new Date( data.date.year, data.date.month, data.date.day, data.date.hours, data.date.minutes, data.date.seconds );
        const now = new Date();
        const diff = Math.abs(now.getTime() - date.getTime());
        const diffHours = Math.floor(diff / (1000 * 60 * 60));
        const progress = diffHours < 24 ? diffHours : 24;

        results.push({ ...data, id: doc.id, progress  });
        console.log(results)
        setTrades(results);
      });
    }, (error) => {
      console.log(error.message);
    });

    return () => unsubscribe();
  }

  getTrades();
  }, [user.email]);


  function formatDuration(hours: number): string {
    return `${hours.toString().padStart(2, '0')}.00.00`;
  }


  return (
    <div className={s.ctn}>
      {trades.map((trade: any) => (
        <div key={trade.id} className={s.wrapper}>
          <div className={s.info}>
            <div>
              Date: <span>{trade.date.day}.{trade.date.month}.{trade.date.year}</span>
            </div>
            <div>Amount: <span>${trade.amount}</span></div>
            <div>Duration: <span>{formatDuration(trade.progress)} left</span></div>
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
