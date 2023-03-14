import Link from "next/link"
import s from "./Nav.module.css"
import { useEffect, useState } from "react"
import useAuth from "@/hooks/useAuth"

export default function Nav(props: {black?: boolean}) {
  const [navbg, setNavbg] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const { user } = useAuth()

  const handleClick = () => {
      setShowMenu(!showMenu)
      console.log(showMenu)
  }

  const handleNavbg = () => {
    if (window.scrollY >=  80) {
      setNavbg(true)  
    } else {
      setNavbg(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleNavbg)
  }, [])

  return (
    <nav className={navbg? s.container2 : s.container}>
      <div className={s.wrapper}>
        <Link href="/" className={s.logo}>
          <h2 style={props.black? {color: "black"} : {color: "inherit"}}>Cryptex</h2>
        </Link>

        {!(props.black) &&
          <div className={s.menu}  style={showMenu ? {right:  "0"} : {right:  '-100%'}} onClick={handleClick}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <a href="#contact">Contact</a>

            {!user &&
            <>
              <Link className={s.getStarted} href="/signUp">Sign up</Link>
              <Link className={s.login} href="/login">Login</Link>
            </>
              }

            {user && <Link className={s.getStarted} href="/dashboard/home">Dashboard</Link> }
          </div>
          }

        <div className={s.hamburger} onClick={handleClick}>
            <span className={showMenu ? s.activeBar : s.bar}style={navbg? {background: "black"}: {}}></span>
            <span className={showMenu ? s.activeBar : s.bar}style={navbg? {background: "black"}: {}}></span>
            <span className={showMenu ? s.activeBar : s.bar}style={navbg? {background: "black"}: {}}></span>
        </div>
      </div>
    </nav>
  )
}
