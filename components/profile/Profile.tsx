import styles from './Profile.module.css';
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';

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
    if (profile?.bal) setTotal(profile?.bal.balance + profile?.bal.profit + profile?.bal.referralBonus)
  }, [document, user]);


  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.cover}>
          <img className={styles.img} src={user.photoURL} alt="avatar" />
          <img className={styles.avatar} src={user.photoURL} alt="avatar" />
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.name}>
          <h1>
            @{user.displayName.length > 10
              ? user.displayName.substring(0, 10) + '..'
              : user.displayName}
          </h1>
          <p>{user.email}</p>
          <div className={styles.equity}>
            <p>Total Assets</p>
            <h1>${total}</h1>
          </div>
        </div>
        <div className={styles.referral}>
          <div className={styles.referralCode}>
            <p>Referral Code</p>
            <h1>{user.displayName}</h1>
          </div>
        </div>
        <div className={styles.moreDetails}>
          <h1>Profile Info</h1>
          <div className={styles.details}>
            <p>
              Full Name: <span>{profile?.fullName}</span>
            </p>
            <p>
              Email: <span>{profile?.email}</span>
            </p>
            <p>
              Phone Number: <span>{profile?.phoneNumber}</span>
            </p>
            <p>
              Country: <span>{profile?.country}</span>
            </p>
            <p>
              UserID: <span>{profile?.uid}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}