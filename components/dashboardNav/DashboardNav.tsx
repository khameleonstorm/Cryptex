import s from './DashboardNav.module.css';
import { MdKeyboardArrowDown } from "react-icons/md";
import Link from 'next/link';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { HiOutlineLogout } from "react-icons/hi";
import { useLogout } from "@/hooks/useLogout"
import useAuth from "@/hooks/useAuth"
import Image from 'next/image';

export default function DashboardNav() {
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
    <div className={s.container}>
      <div className={s.hello}>
        <p>Hello! </p>
        <p>{user.displayName}</p>
      </div>
      <div className={s.logo}>
        <div className={s.image}>
          <Image 
          src={user?.photoURL ? user?.photoURL : `https://robohash.org/${user.uid}`} 
          alt="Avatar!"
          width={35}
          height={35}
          priority
          />
        </div>
        <MdKeyboardArrowDown size="1.8em" style={{cursor: 'pointer'}} onClick={handleClick}/>
        {menu && 
          <div className={s.menu} onClick={handleClick}>
            <Link href="/">Home</Link>
            <Button variant="outlined" color="error" size="small" style={{fontSize: "0.7rem"}} onClick={logout}> 
              Logout <HiOutlineLogout size="1.3em" style={{marginLeft: "1rem"}}/>
            </Button>
          </div>
        }
      </div>
    </div>
  )
}
