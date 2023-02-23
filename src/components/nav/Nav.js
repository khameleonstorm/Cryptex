import { NavLink, Link } from "react-router-dom"
import styles from "./Nav.module.css"
import { useEffect, useState } from "react"
import useAuth from "../../hooks/useAuth"

export default function Nav({black}) {
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

  const handleContact = () => {
    const contact = document.getElementById("contact");
    window.scrollTo({
      top:contact.offsetTop,
      behavior:"smooth"
    });
    console.log(contact)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleNavbg)
  }, [])

  return (
    <nav className={navbg? styles.container2 : styles.container}>
      <div className={styles.wrapper}>
        <Link to="/" className={styles.logo}>
          <h2 style={black?{color: "black"}: {color: "inherit"}}>Cryptex</h2>
        </Link>

        {!(black) &&
          <div className={styles.menu}  style={showMenu ? {right:  "0"} : {right:  '-100%'}} onClick={handleClick}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <a onClick={handleContact} href="#contact">Contact</a>

          {!user &&
          <>
            <Link className={styles.getStarted} to="/signUp">Sign up</Link>
            <Link className={styles.login} to="/login">Login</Link>
          </>
            }

          {user && <Link className={styles.getStarted} to="/dashboard">Dashboard</Link>}
          </div>
          }

        <div className={styles.hamburger} onClick={handleClick}>
            <span 
            className={showMenu ? styles.activeBar : styles.bar}
            style={navbg?{background: "black"}: {background: ""}}
            ></span>
            <span 
            className={showMenu ? styles.activeBar : styles.bar}
            style={navbg?{background: "black"}: {background: ""}}
            ></span>
            <span 
            className={showMenu ? styles.activeBar : styles.bar}
            style={navbg?{background: "black"}: {background: ""}}
            ></span>
        </div>
      </div>
    </nav>
  )
}
