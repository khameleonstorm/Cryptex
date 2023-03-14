import s from './Users.module.css'
import { HiArrowNarrowRight, HiArrowNarrowLeft } from "react-icons/hi";
import { useState } from 'react';
import { PulseLoader } from 'react-spinners';
import Image from 'next/image';


export default function Users({document, error, isPending, filter}: any) {
  const [ fullWidth, setFullWidth ] = useState(false)



  return (
    <div className={fullWidth ? s.container2 : s.container}>
      {!fullWidth && <HiArrowNarrowRight size="1.5em" className={s.arrow} onClick={() => setFullWidth(!fullWidth)}/>}
      {fullWidth && <HiArrowNarrowLeft size="1.5em" className={s.arrow} onClick={() => setFullWidth(!fullWidth)}/>}
      {isPending && <PulseLoader color='#00000080' size={7}/> }
      {error && <div>{error}</div>}

      {document && 
      document.map((user: {uid: string, email: string, photoURL: string}) => 
        <div className={s.users} key={user.uid} onClick={() => filter(user.email)}>
            <div className={s.img}>
              <Image priority src={user.photoURL ? user.photoURL : `https://robohash.org/${user.uid}`} width={33} height={33} alt="avatar" style={{borderRadius: "50%"}}/>
            </div>
            <p>{user.email}</p>
        </div>
      )
      }
    </div>
  )
}