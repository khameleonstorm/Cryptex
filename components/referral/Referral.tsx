import s from './Referral.module.css';
import referral from "../../public/assets/Refer.svg";
import { IoCopy } from 'react-icons/io5';
import { FaLink } from 'react-icons/fa';
import useAuth from '@/hooks/useAuth';
import { useState } from 'react';
import Image from 'next/image';

export default function Referral() {
  const { user } = useAuth();
  const [copyLink, setCopyLink] = useState(false);
  const [copyText, setCopyText] = useState(false);

  const copyToClipBoard = async (copyMe: string) => {
    setCopyLink(true)
    try {
      await navigator.clipboard.writeText(copyMe);
      setTimeout(() => {
        setCopyLink(false)
      }, 3000);
    } catch (err: any) {
      console.log(err.message);
    }
  }

  const copyToClipBoard2 = async (copyMe: string) => {
    setCopyText(true)
    try {
      await navigator.clipboard.writeText(copyMe);
      setTimeout(() => {
        setCopyText(false)
      }, 3000);
    } catch (err: any) {
      console.log(err.message);
    }
  }


  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <h1>Refer A Friend</h1>
        <div className={s.imgCtn}>
          <Image src={referral} alt="referral" width="300" height="300" priority/>
        </div>
        <p>Get 2% of every deposit made by any customer you refer.</p>
        <div className={s.copyWrapper}>
          <h2>{user.uid?.length > 5 ? user.uid.substring(0, 5) + ".." : user.uid}
          </h2>
          <div className={s.icons}>
            <IoCopy style={copyText ? {color: "#00b35f"} : {}} onClick={() => copyToClipBoard2(user.uid)}/>
            <FaLink style={copyLink ? {color: "#00b35f"} : {}} onClick={() => copyToClipBoard(`https://cryptex-three.vercel.app/signup/${user.uid}`)}/>
          </div>
        </div>
      </div>
    </div>
  )
}
