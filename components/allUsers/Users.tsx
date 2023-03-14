import styles from './Users.module.css'
import { HiArrowNarrowRight } from "react-icons/hi";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { useState } from 'react';
import { PulseLoader } from 'react-spinners';


export default function Users({document, error, isPending, filter}: any) {
  const [ fullWidth, setFullWidth ] = useState(false)



  return (
    <div className={fullWidth ? styles.container2 : styles.container}>
      {!fullWidth && <HiArrowNarrowRight size="1.5em" className={styles.arrow} onClick={() => setFullWidth(!fullWidth)}/>}
      {fullWidth && <HiArrowNarrowLeft size="1.5em" className={styles.arrow} onClick={() => setFullWidth(!fullWidth)}/>}
      {isPending && <PulseLoader color='#00000080' size={7}/> }
      {error && <div>{error}</div>}

      {document && 
      document.map((user: {uid: string, email: string, photoURL: string}) => 
        <div className={styles.users} key={user.uid} onClick={() => filter(user.email)}>
            <div className={styles.img}>
              <img src={user.photoURL ? user.photoURL : `https://robohash.org/${user.uid}`} width={33} height={33} alt="avatar" style={{borderRadius: "50%"}}/>
            </div>
            <p>{user.email}</p>
        </div>
      )
      }
    </div>
  )
}