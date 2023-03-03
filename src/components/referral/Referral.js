import styles from './Referral.module.css';
import referral from "../../assets/Refer.svg";
import { IoCopy } from 'react-icons/io5';
import { FaLink } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';

export default function Referral() {
  const { user } = useAuth();
  const [copyLink, setCopyLink] = useState(false);
  const [copyText, setCopyText] = useState(false);

  const copyToClipBoard = async copyMe => {
    setCopyLink(true)
    try {
      await navigator.clipboard.writeText(copyMe);
      setTimeout(() => {
        setCopyLink(false)
      }, 3000);
    } catch (err) {
      console.log(err.message);
    }
  }

  const copyToClipBoard2 = async copyMe => {
    setCopyText(true)
    try {
      await navigator.clipboard.writeText(copyMe);
      setTimeout(() => {
        setCopyText(false)
      }, 3000);
    } catch (err) {
      console.log(err.message);
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Refer A Friend</h1>
        <img src={referral} alt='refer a friend'/>
        <p>Get 2% of every deposit made by any customer you refer.</p>
        <div className={styles.copyWrapper}>
          <h2>{user.displayName.length > 5 ? user.displayName.substring(0, 5) + ".." : user.displayName}
          </h2>
          <div className={styles.icons}>
            <IoCopy style={copyText && {color: "#00b35f"}} onClick={() => copyToClipBoard2(user.displayName)}/>

            <FaLink style={copyLink && {color: "#00b35f"}} onClick={() => copyToClipBoard(`https://cryptex-three.vercel.app/signUp/${user.displayName}`)}/>
          </div>
        </div>
      </div>
    </div>
  )
}
