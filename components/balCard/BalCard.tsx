import styles from './BalCard.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/firebase/config';

type acc = Array<object>
type doc =  {[key: string]: {[key: string]: {[key: string]: number}}}

export default function BalCard({doc}: doc | any) {
  const [account, setAccount] = useState<acc>([])
  const q = query(collection(db, 'profile'), where('referral', '==', doc.uid));

  useEffect(() => {
    async function fetchTrades() {
      const unsubscribe = onSnapshot(q, (snapshot: any) => {
          let results: Array<object> = []
          snapshot.forEach((doc: any)=> results.push({ ...doc.data(), id: doc.id}))

          // check for referral bonus
          if(results.length > 0){
          }
        },
        (error: any) => {
          console.log(error.message)
        });
      
        return () => unsubscribe()
    }

    fetchTrades();
  }, [doc.uid]);

  useEffect(() => {
    if(doc){
      setAccount([
        { balance: doc.bal.balance, title: "Balance", trade: true },
        { balance: doc.bal.profit, title: "Profit" },
        { balance: doc.bal.totalWithdrawal, title: "Total Withdraw" },
        { balance: doc.bal.referralBonus, title: "Referral Bonus" },
      ])
    }
  }, [doc])

  return (doc &&
    <div className={styles.container}>
      <div>
        <div className={styles.btns}>
          <Link href='/dashboard/deposit'>Deposit</Link>
          <Link href='/dashboard/withdraw'>Withdraw</Link>
        </div>


        <div className={styles.balCard}>
          {account.map((account: any, i) => 
            <div className={styles.card} key={i}>
              <div>
                <h2>{account.title}</h2>
                <p style={account.balance > 0 ?{color: "#00b35f"} : {}}>Activity &darr;100%</p>
              </div>
              <h1>{account.balance?.toFixed(2)} USD</h1>
              {account.trade && 
                <div className={styles.btns2}>
                  <Link href='/dashboard/trade'>Open trade</Link>
                  <Link href='/dashboard/trade'>close trade</Link>
                </div>
              }
            </div>
          )}
          </div>

      </div>
    </div>
  )
}