import styles from './BalCard.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type acc = Array<object>
type doc =  {[key: string]: {[key: string]: {[key: string]: number}}}

export default function BalCard({doc}: doc | any) {
  const [account, setAccount] = useState<acc>([])

  useEffect(() => {
    if(doc)
      setAccount([
        { balance: doc.bal.balance, title: "Balance", trade: true },
        { balance: doc.bal.profit, title: "Profit" },
        { balance: doc.bal.totalWithdrawal, title: "Total Withdraw" },
        { balance: doc.bal.referralBonus, title: "Referral Bonus" },
      ])
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
              <h1>{account.balance} USD</h1>
              {account.trade && 
                <div className={styles.btns2}>
                  <Link href='/dashboard/trade'>Open trade</Link>
                  <Link href='#'>close trade</Link>
                </div>
              }
            </div>
          )}
          </div>

      </div>
    </div>
  )
}