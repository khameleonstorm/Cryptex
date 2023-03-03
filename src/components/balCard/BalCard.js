import styles from './BalCard.module.css';

// importing icons
import { MdOutlineShowChart, MdSavings } from 'react-icons/md';
import { FaCoins } from 'react-icons/fa';
import { GiCash, GiReceiveMoney } from 'react-icons/gi';
import { AiFillGift } from 'react-icons/ai';
import { Link } from 'react-router-dom';

//import useCollection hook


export default function BalCard({doc}) {

  return (
    <div className={styles.container}>
      <div>
      <div className={styles.btns}>
          <Link to='/dashboard/deposit'>Deposit</Link>
          <Link to='/dashboard/withdraw'>Withdraw</Link>
        </div>
      <div className={styles.balCard}>
          <div className={styles.card}>
            <div className={styles.cardheader}>
              <div className={styles.isactive}>
                <MdSavings className={styles.circle}/>
              </div>
              <div className={styles.cardtitle}>
                <h3>Crypto Balance</h3>
              </div>
            </div>
  
            <div className={styles.cardbody}>
              <h1>{doc?.bal.cryptoBalance}</h1>
              <MdOutlineShowChart className={styles.chart} style={doc?.bal.cryptoBalance > 0 ?{color: "#00ffaa"} : {color: "#e90000"}}/>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardheader}>
              <div className={styles.isactive}>
                <MdSavings className={styles.circle}/>
              </div>
              <div className={styles.cardtitle}>
                <h3>Fiat Balance</h3>
              </div>
            </div>
  
            <div className={styles.cardbody}>
              <h1>{doc?.bal.fiatBalance}</h1>
              <MdOutlineShowChart className={styles.chart} style={doc?.bal.fiatBalance > 0 ?{color: "#00ffaa"} : {color: "#e90000"}}/>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardheader}>
              <div className={styles.isactive}>
              <FaCoins className={styles.circle}/>
              </div>
              <div className={styles.cardtitle}>
                <h3>Crypto Deposit</h3>
              </div>
            </div>
  
            <div className={styles.cardbody}>
              <h1>{doc?.bal.cryptoDeposit}</h1>
              <MdOutlineShowChart className={styles.chart} style={doc?.bal.cryptoDeposit > 0 ?{color: "#00ffaa"} : {color: "#e90000"}}/>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardheader}>
              <div className={styles.isactive}>
              <FaCoins className={styles.circle}/>
              </div>
              <div className={styles.cardtitle}>
                <h3>Fiat Deposit</h3>
              </div>
            </div>
  
            <div className={styles.cardbody}>
              <h1>{doc?.bal.fiatDeposit}</h1>
              <MdOutlineShowChart className={styles.chart} style={doc?.bal.fiatDeposit > 0 ?{color: "#00ffaa"} : {color: "#e90000"}}/>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardheader}>
              <div className={styles.isactive}>
              <GiReceiveMoney className={styles.circle}/>
              </div>
              <div className={styles.cardtitle}>
                <h3>Total Withdrawal</h3>
              </div>
            </div>
  
            <div className={styles.cardbody}>
              <h1>{doc?.bal.totalWithdrawal}</h1>
              <MdOutlineShowChart className={styles.chart} style={doc?.bal.balance > 0 ?{color: "#00ffaa"} : {color: "#e90000"}}/>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardheader}>
              <div className={styles.isactive}>
                <AiFillGift className={styles.circle}/>
              </div>
              <div className={styles.cardtitle}>
                <h3>Referral Bonus</h3>
              </div>
            </div>
  
            <div className={styles.cardbody}>
              <h1>{doc?.bal.referralBonus}</h1>
              <MdOutlineShowChart className={styles.chart} style={doc?.bal.referralBonus > 0 ?{color: "#00ffaa"} : {color: "#e90000"}}/>
            </div>
          </div>
      </div>
      </div>
    </div>
  )
}