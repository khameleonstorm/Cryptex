// import styles
import styles from './SideNav.module.css'

//importing router functions
import { useRouter } from 'next/router'

//importing logout and auth context
import { useLogout } from '../../hooks/useLogout'
import useAuth from '../../hooks/useAuth'

//importing icons
import {BsPersonFill, BsPerson} from "react-icons/bs";
import { HiHome, HiOutlineHome, HiOutlineLogout} from "react-icons/hi";
import { IoStatsChartOutline, IoStatsChart, IoGiftOutline, IoGift, IoWalletOutline, IoWallet } from 'react-icons/io5'

export default function SideNav() {
  const { authIsReady, user } = useAuth()
  const { logout } = useLogout()
  const navigate = useRouter()
  const page = navigate.query.page
  

  return (authIsReady && user &&
    <div className={styles.container}>
        <div className={styles.profile}>
            <img src={user.photoURL ? user.photoURL : `https://robohash.org/${user.uid}`} alt="avatar"/>
        </div>
        <div className={styles.links}>
          {page === undefined || page === "home" ? 
          <div className={styles.active}>
            <HiOutlineHome onClick={() => navigate.push("/dashboard/home")} className={styles.menuIcon}/> 
            <p onClick={() => navigate.push("/dashboard/home")}>Dashboard</p>
          </div> :
          <div>
            <HiHome onClick={() => navigate.push("/dashboard/home")} className={styles.menuIcon}/> 
            <p onClick={() => navigate.push("/dashboard/home")}>Dashboard</p>
          </div>
          }

          {(page === "deposit") ?
          <div className={styles.active}>
            <IoWalletOutline onClick={() => navigate.push("/dashboard/deposit")} className={styles.menuIcon}/> 
            <p onClick={() => navigate.push("/dashboard/deposit")}>Deposit</p>
          </div> :
          <div>
            <IoWallet onClick={() => navigate.push("/dashboard/deposit")} className={styles.menuIcon}/> 
            <p onClick={() => navigate.push("/dashboard/deposit")}>Deposit</p>
          </div>
          }

          {(page === "trade") ?
          <div className={styles.active}>
            <IoStatsChartOutline onClick={() => navigate.push("/dashboard/trade")} className={styles.menuIcon}/> 
            <p onClick={() => navigate.push("/dashboard/trade")}>Trade</p>
          </div> :
          <div>
            <IoStatsChart onClick={() => navigate.push("/dashboard/trade")} className={styles.menuIcon}/> 
            <p onClick={() => navigate.push("/dashboard/trade")}>Trade</p>
          </div>
          }

          {(page === "profile") ?
          <div className={styles.active}>
            <BsPerson onClick={() => navigate.push("/dashboard/profile")} className={styles.menuIcon}/> 
            <p onClick={() => navigate.push("/dashboard/profile")}>Profile</p>
          </div> :
          <div>
            <BsPersonFill onClick={() => navigate.push("/dashboard/profile")} className={styles.menuIcon}/> 
            <p onClick={() => navigate.push("/dashboard/profile")}>Profile</p>
          </div>
          }

          {(page === "referral") ?
          <div className={styles.active}>
            <IoGiftOutline onClick={() => navigate.push("/dashboard/referral")} className={styles.menuIcon}/> 
            <p onClick={() => navigate.push("/dashboard/referral")}>Referral</p>
          </div> :
          <div>
            <IoGift onClick={() => navigate.push("/dashboard/referral")} className={styles.menuIcon}/> 
            <p onClick={() => navigate.push("/dashboard/referral")}>Referral</p>
          </div>
          }

        </div>
        <div className={styles.exit} onClick={logout}>
          <HiOutlineLogout className={styles.logout} style={{marginLeft: "1rem"}}/>
          <p>LogOut</p>
        </div>
    </div>
  )
}
