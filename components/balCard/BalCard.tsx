import styles from './BalCard.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, doc, writeBatch, increment } from 'firebase/firestore';
import { db } from '@/firebase/config';

type acc = Array<object>
type document =  {[key: string]: {[key: string]: {[key: string]: number}}}

export default function BalCard({doc: profile}: document | any) {
  const [account, setAccount] = useState<acc>([])
  const q = query(collection(db, 'profile'), where('referral.code', '==', profile.uid), where('referral.isAdded', '==', false), where('bal.balance', '>', 0));

  useEffect(() => {
    async function fetchTrades() {
      const unsubscribe = onSnapshot(q, (snapshot) => {
        let results: Array<object> = []
        snapshot.forEach((document: any) => results.push({ ...document.data(), id: document.id}))
  
        if(results.length > 0){ 
          const bonus = results.length * 1  // $1 is the bonus amount
  
          results.forEach((document: any) =>{
            const referreredRef = doc(collection(db, 'profile'), document.id)
            const referrerRef = doc(collection(db, 'profile'), profile.uid)
            
            // const batch = writeBatch(db) // create a new batch object
            // batch.update(referreredRef, {"referral.isAdded": true})
            // batch.update(referrerRef, {"bal.referralBonus": increment(bonus), "bal.balance": increment(bonus)})
            
            // // Commit the batch
            // batch.commit()
            //   .then(() =>console.log("Batch committed successfully"))
            //   .catch((error) => console.error("Error committing batch:", error));
          })
        } 
      }, (error: any) => {
        console.log(error.message)
      });
      return () => unsubscribe()
    }
    fetchTrades();
  }, [profile.uid]);

  useEffect(() => {
    if(profile){
      setAccount([
        { balance: profile.bal.balance, title: "Balance", trade: true },
        { balance: profile.bal.profit, title: "Profit" },
        { balance: profile.bal.totalWithdrawal, title: "Total Withdraw" },
        { balance: profile.bal.referralBonus, title: "Referral Bonus" },
      ])
    }
  }, [doc])

  return (document &&
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
                  <Link href='/dashboard/trade'>Close trade</Link>
                </div>
              }
            </div>
          )}
          </div>

      </div>
    </div>
  )
}