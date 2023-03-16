import s from './Dashboard.module.css';
import useAuth from '@/hooks/useAuth';
import useCollection from '@/hooks/useCollection';

// importing components
import SideNav from '@/components/sideNav/SideNav';
import BalCard from '@/components/balCard/BalCard';
import DashboardNav from '@/components/dashboardNav/DashboardNav';
import { TradeList } from '@/components/tradeList/TradeList';

// importing router functions
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { MoonLoader } from 'react-spinners';



export default function Index() {
  const { doc, isPending } = useCollection('profile', false, true);
  const { user, authIsReady } = useAuth()
  const navigate = useRouter()

  useEffect(() => {
    if(user && authIsReady){
      if(user.email === "trustsolidfx@gmail.com") navigate.push('/admin')
    }
    if(authIsReady && !user) navigate.push('/login')
  }, [user, navigate, authIsReady])



  if(isPending){
    return (
      <div className={s.spinnerContainer}>
        <div className={s.spinner}>
          <MoonLoader color="#1649ff" />
        </div>
      </div>
    )
  }




  return ((user && doc && authIsReady) &&
    <div className={s.container}>
      <div className={s.side}>
        <SideNav />
      </div>
      
      <div className={s.main}>
        <DashboardNav />
        <BalCard doc={doc[0]}/>
        <TradeList user={user} />
      </div>
    </div>
  )
}
