import styles from './BalCard.module.css';
import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';

export default function BalCard({doc}) {
  const [account, setAccount] = useState(null)

  useEffect(() => {
    setAccount([
      { balance: doc?.bal.balance, title: "Balance", trade: true },
      { balance: doc?.bal.profit, title: "profit" },
      { balance: doc?.bal.totalWithdrawal, title: "Total Withdraw" },
      { balance: doc?.bal.referralBonus, title: "Referral Bonus" },
    ])
  }, [doc])

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.btns}>
          <Link to='/dashboard/deposit'>Deposit</Link>
          <Link to='/dashboard/withdraw'>Withdraw</Link>
        </div>


        <div className={styles.balCard}>
          {account?.map((account, i) => 
            <div className={styles.card} key={i}>
              <div>
                <h2>{account.title}</h2>
                <p style={account.balance > 0 ?{color: "#00b35f"} : {}}>Activity &darr;100%</p>
              </div>
              <h1>{account.balance} USD</h1>
              {account.trade && 
                <div className={styles.btns2}>
                  <Link to='#'>Open trade</Link>
                  <Link to='#'>close trade</Link>
                </div>
              }
            </div>
          )}
          </div>

      </div>
    </div>
  )
}