import styles from './DashboardNav.module.css';
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { HiOutlineLogout } from "react-icons/hi";
import { useLogout } from "../../hooks/useLogout"
import useAuth from "../../hooks/useAuth"

export default function DashboardNav({admin}) {
  const { authIsReady, user } = useAuth()
  const { logout } = useLogout()
  const [menu, setMenu] = useState(false)



  const handleClick = () => {
    if (menu) {
      setMenu(false)
    }
    if (!menu) {
      setMenu(true)
    }
  }

  return ((authIsReady && user) &&
    <div className={styles.container}>
      <div className={styles.hello}>
        <p>Hello! </p>
        <p>{user.displayName}</p>
      </div>
      <div className={styles.logo}>
        <div className={styles.image}>
          <img src={user.photoURL ? user.photoURL : `https://robohash.org/${user.uid}`} alt="Avatar!" />
        </div>
        <MdKeyboardArrowDown size="1.8em" style={{cursor: 'pointer'}} onClick={handleClick}/>
        {menu && 
          <div className={styles.menu} onClick={handleClick}>
            <Link to="/home">Home</Link>
            <Button variant="outlined" color="error" size="small" style={{fontSize: "0.7rem"}} onClick={logout}> Logout <HiOutlineLogout size="1.3em" style={{marginLeft: "1rem"}}/>
            </Button>
          </div>
        }
      </div>
    </div>
  )
}
