import styles from './BalCard.module.css';
import { Link } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useEffect, useState } from 'react';

export default function BalCard({doc}) {
  const [account, setAccount] = useState("fiat")
  const [fiatAccount, setFiatAccount] = useState(null)
  const [cryptoAccount, setCryptoAccount] = useState(null)

  const handleChange = (e) => {
    setAccount(e.target.value)

    if(e.target.value === "fiat") {
      setFiatAccount([
        { balance: doc?.bal.fiatBalance, title: "Fiat Balance", trade: true },
        { balance: doc?.bal.fiatDeposit, title: "Fiat Deposit" },
        { balance: doc?.bal.totalWithdrawal, title: "Total Withdraw" },
        { balance: doc?.bal.referralBonus, title: "Referral Bonus" },
      ])
      setCryptoAccount(null)
      return
    }

    if(e.target.value === "crypto") {
      setCryptoAccount([
        { balance: doc?.bal.cryptoBalance, title: "Crypto Balance", trade: true},
        { balance: doc?.bal.cryptoDeposit, title: "Crypto Deposit" },
        { balance: doc?.bal.totalWithdrawal, title: "Total Withdraw" },
        { balance: doc?.bal.referralBonus, title: "Referral Bonus" },
      ])
      setFiatAccount(null)
      return
    }
  }

  useEffect(() => {
    setFiatAccount([
      { balance: doc?.bal.fiatBalance, title: "Fiat Balance", trade: true },
      { balance: doc?.bal.fiatDeposit, title: "Fiat Deposit" },
      { balance: doc?.bal.totalWithdrawal, title: "Total Withdraw" },
      { balance: doc?.bal.referralBonus, title: "Referral Bonus" },
    ])
  }, [])

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.btns}>
          <Link to='/dashboard/deposit'>Deposit</Link>
          <Link to='/dashboard/withdraw'>Withdraw</Link>
          <FormControl sx={{minWidth: 120 }} size="small" className={styles.selectWrapper}>
            <InputLabel id="account">Account</InputLabel>
            <Select value={account} onChange={handleChange} className={styles.select}>
              <MenuItem value={"fiat"}>Fiat Account</MenuItem>
              <MenuItem value={"crypto"}>Crypto Account</MenuItem>
            </Select>
          </FormControl>
        </div>


        <div className={styles.balCard}>
          {fiatAccount && fiatAccount.map((fiat, i) => 
            <div className={styles.card} key={i}>
              <div>
                <h2>{fiat.title}</h2>
                <p style={fiat.balance > 0 ?{color: "#00b35f"} : {}}>Activity 100% &darr;</p>
              </div>
              <h1>{fiat.balance} USD</h1>
              <div className={styles.btns2}>
                <Link to='#'>Open trade</Link>
                <Link to='#'>close trade</Link>
              </div>
            </div>
          )}

          {cryptoAccount && cryptoAccount.map((crypto, i) => 
            <div className={styles.card} key={i}>
              <div>
                <h2>{crypto.title}</h2>
                <p style={crypto.balance > 0 ?{color: "#00b35f"} : {}}>Activity 100% &darr;</p>
              </div>
              <h1>{crypto.balance} USD</h1>
              <div className={styles.btns2}>
                <Link to='#'>Open trade</Link>
                <Link to='#'>close trade</Link>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}