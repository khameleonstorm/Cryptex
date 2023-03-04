// import styles
import styles from './SideNav.module.css'

//importing router functions
import { useNavigate, useParams } from 'react-router-dom'

//importing logout and auth context
import { useLogout } from '../../hooks/useLogout'
import useAuth from '../../hooks/useAuth'

//importing icons
import {BsPersonFill, BsPerson} from "react-icons/bs";
import { HiHome, HiOutlineHome, HiOutlineLogout} from "react-icons/hi";
import { MdOutlineAccountBalance, MdAccountBalance } from 'react-icons/md'
import { IoStatsChartOutline, IoStatsChart, IoBarChartOutline, IoBarChartSharp } from 'react-icons/io5'

export default function SideNav() {
  const { authIsReady, user } = useAuth()
  const { page } = useParams()
  const { logout } = useLogout()
  const navigate = useNavigate()
  

  return (authIsReady &&
    <div className={styles.container}>
        <div className={styles.profile}>
            <img src={user.photoURL ? user.photoURL : `https://robohash.org/${user.uid}`} alt="avatar"/>
        </div>
        <div className={styles.links}>
          {page === undefined || page === "home" ? 
          <div className={styles.active}>
            <HiOutlineHome onClick={() => navigate("/dashboard/home")} className={styles.menuIcon}/> 
            <p onClick={() => navigate("/dashboard/home")}>Dashboard</p>
          </div> :
          <div>
            <HiHome onClick={() => navigate("/dashboard/home")} className={styles.menuIcon}/> 
            <p onClick={() => navigate("/dashboard/home")}>Dashboard</p>
          </div>
          }

          {(page === "deposit") ?
          <div className={styles.active}>
            <MdOutlineAccountBalance onClick={() => navigate("/dashboard/deposit")} className={styles.menuIcon}/> 
            <p onClick={() => navigate("/dashboard/deposit")}>Deposit</p>
          </div> :
          <div>
            <MdAccountBalance onClick={() => navigate("/dashboard/deposit")} className={styles.menuIcon}/> 
            <p onClick={() => navigate("/dashboard/deposit")}>Deposit</p>
          </div>
          }

          {(page === "trade") ?
          <div className={styles.active}>
            <IoStatsChartOutline onClick={() => navigate("/dashboard/trade")} className={styles.menuIcon}/> 
            <p onClick={() => navigate("/dashboard/trade")}>Trade</p>
          </div> :
          <div>
            <IoStatsChart onClick={() => navigate("/dashboard/trade")} className={styles.menuIcon}/> 
            <p onClick={() => navigate("/dashboard/trade")}>Trade</p>
          </div>
          }

          {(page === "profile") ?
          <div className={styles.active}>
            <BsPerson onClick={() => navigate("/dashboard/profile")} className={styles.menuIcon}/> 
            <p onClick={() => navigate("/dashboard/profile")}>Profile</p>
          </div> :
          <div>
            <BsPersonFill onClick={() => navigate("/dashboard/profile")} className={styles.menuIcon}/> 
            <p onClick={() => navigate("/dashboard/profile")}>Profile</p>
          </div>
          }

          {(page === "referral") ?
          <div className={styles.active}>
            <IoBarChartOutline onClick={() => navigate("/dashboard/referral")} className={styles.menuIcon}/> 
            <p onClick={() => navigate("/dashboard/referral")}>Referral</p>
          </div> :
          <div>
            <IoBarChartSharp onClick={() => navigate("/dashboard/referral")} className={styles.menuIcon}/> 
            <p onClick={() => navigate("/dashboard/referral")}>Referral</p>
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
