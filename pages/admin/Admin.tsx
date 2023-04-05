import s from './Admin.module.css';
import useAuth from '@/hooks/useAuth';
import useCollection from '@/hooks/useCollection';

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
      if(user.email !== "trustsolidfx@gmail.com") navigate.push('/dashboard')
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
      </div>
      
      <div className={s.main}>
      </div>
    </div>
  )
}
