import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
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

export function TradeList({ user }: any) {
  const [trades, setTrades] = useState<list|any>([]);

  useEffect(() => {
    async function fetchTrades() {
      const q = query(collection(db, 'trades'), where('email', '==', user.email));
      const querySnapshot = await getDocs(q);
      const tradeDocs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTrades(tradeDocs);
    }

    fetchTrades();
  }, [user.email]);

  return (
    <div className='progressCtn'>
      {trades.map((trade: tradeDoc) => (
          <div key={trade.id}  className='progressWrapper'>
            <div className='progressInfo'>
              <div>Date: {trade.date.day}/{trade.date.month}/{trade.date.year}</div>
              <div>Amount: {trade.amount}</div>
              <div>Progress: {trade.progress} / 24 hours</div>
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
        height: '11px',
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
        className='progressBar'
      />
    </div>
  );
}
