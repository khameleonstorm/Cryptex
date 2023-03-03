import styles from './Dashboard.module.css';
import useAuth from '../../hooks/useAuth';
import useCollection from '../../hooks/useCollection';

// importing components
import SideNav from '../../components/sideNav/SideNav';
import Funding from '../../components/funding/Funding';
import Profile from '../../components/profile/Profile';
import InvestmentCard from '../../components/investmentCard/InvestmentCard';
import BalCard from '../../components/balCard/BalCard';

// importing router functions
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';

// importing plans
import { plans } from '../../utils/investText';
import DashboardNav from '../../components/dashboardNav/DashboardNav';
import Referral from '../../components/referral/Referral';



export default function Dashboard() {
  const { document: doc, isPending } = useCollection('profile', false, true);
  const { authIsReady, user } = useAuth()
  const { page } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    const chatDiv = document.getElementById('tidio-chat')
    if(chatDiv){
      chatDiv.style.display = 'none';
    }

    if(authIsReady){
      if(user.email === "trustsolidfx@gmail.com"){
        navigate('/admin')
      }
      if(!user){
        navigate('/login')
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
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}>
          <MoonLoader color="#1649ff" />
        </div>
      </div>
    )
  }




  return ((authIsReady && user?.email !== "worldofhydras@gmail.com" && doc) &&
    <div className={styles.container}>
      <div className={styles.side}>
        <SideNav />
      </div>
      {(page === undefined || page === 'home') &&
      <div className={styles.main}>
        <DashboardNav />
        <BalCard doc={doc[0]}/>
      </div>
      }


      {page === 'deposit' &&
      <div className={styles.main}>
        <DashboardNav />
        <Funding />
      </div>
      }


      {page === 'invest' &&
      <div className={styles.main}>
        <DashboardNav />
        <InvestmentCard title={plans.title} subtitle={plans.subtitle} plans={plans.plans} dashboard={true}/>
      </div>
      }


      {page === 'profile' &&
      <div className={styles.main}>
        <Profile document={doc}/>
      </div>
      }

      {page === 'referral' &&
      <div className={styles.main}>
        <DashboardNav />
        <Referral />
      </div>
      }
      
    </div>
  )
}
