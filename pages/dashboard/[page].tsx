import s from './Dashboard.module.css';
import useAuth from '@/hooks/useAuth';
import useCollection from '@/hooks/useCollection';

// importing components
import SideNav from '@/components/sideNav/SideNav';
import Funding from '@/components/funding/Funding';
import Profile from '@/components/profile/Profile';

// importing router functions
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { MoonLoader } from 'react-spinners';

// importing plans
import DashboardNav from '@/components/dashboardNav/DashboardNav';
import Referral from '@/components/referral/Referral';
import Trading from '@/components/trading/Trading';
import BalCard from '@/components/balCard/BalCard';



export default function Index() {
  const { doc, isPending } = useCollection('profile', false, true);
  const { authIsReady, user } = useAuth()
  const navigate = useRouter()
  const page = navigate.query.page

  useEffect(() => {
    const chatDiv = document.getElementById('tidio-chat')
    if(chatDiv){
      chatDiv.style.display = 'none';
    }

    if(authIsReady){
      if(user.email === "trustsolidfx@gmail.com"){
        navigate.push('/admin')
      }
      if(!user){
        navigate.push('/login')
      }
    }

    return () => {
      if(chatDiv){
        chatDiv.style.display = 'block';
      }
    }

  }, [authIsReady, user, navigate])



  if(isPending){
    return (
      <div className={s.spinnerContainer}>
        <div className={s.spinner}>
          <MoonLoader color="#1649ff" />
        </div>
      </div>
    )
  }




  return ((authIsReady && user?.email !== "trustsolidfx@gmail.com" && doc) &&
    <div className={s.container}>
      <div className={s.side}>
        <SideNav />
      </div>

      {(page === undefined || page === 'home') &&
      <div className={s.main}>
        <DashboardNav />
        <BalCard doc={doc[0]}/>
      </div>
      } 

      {page === 'deposit' &&
      <div className={s.main}>
        <DashboardNav />
        <Funding />
      </div>
      }


      {page === 'trade' &&
      <div className={s.main}>
        <DashboardNav />
        <Trading doc={doc[0]}/>
      </div>
      }


      {page === 'profile' &&
      <div className={s.main}>
        <Profile document={doc}/>
      </div>
      }

      {page === 'referral' &&
      <div className={s.main}>
        <DashboardNav />
        <Referral />
      </div>
      }
      
    </div>
  )
}
