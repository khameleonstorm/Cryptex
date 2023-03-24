import s from './Profile.module.css';
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import Image from 'next/legacy/image';

interface Document {
  email: string;
  fullName: string;
  phoneNumber: string;
  country: string;
  uid: string;
  bal: {
    balance: number;
    profit: number;
    referralBonus: number;
  };
}

interface Profile extends Document {}

interface Props {
  document: Document[];
}

export default function Profile({ document }: Props | any): JSX.Element {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null | undefined>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (document) setProfile(document.find((doc: object|any) => doc.email === user.email));
    if (profile) setTotal(profile?.bal.balance)

    console.log(document)
  }, [document, user, profile]);


  return (
    <div className={s.container}>
      <div className={s.profile}>
        <div className={s.cover}>
          <Image className={s.img} src={user.photoURL} alt="avatar" layout='fill' priority/>
          <div className={s.avatar}>
            <Image src={user.photoURL} alt="avatar" layout='fill' priority/>
          </div>
        </div>
      </div>

      <div className={s.info}>
        <div className={s.name}>
          <h1>
            @{user.displayName?.length > 10
              ? user.displayName?.substring(0, 10) + '..'
              : user.displayName}
          </h1>
          <p>{user.email}</p>
          <div className={s.equity}>
            <p>Total Assets</p>
            <h1>${total?.toFixed(2)}</h1>
          </div>
        </div>
        <div className={s.moreDetails}>
          <h1>Profile Info</h1>
          <div className={s.details}>
            <p>Full Name: <span>{profile?.fullName}</span> </p>
            <p>Email: <span>{profile?.email}</span></p>
            <p>Phone Number: <span>{profile?.phoneNumber}</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}
