import styles from './Hero.module.css';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';

export default function Hero() {
  const { user } = useAuth();
  const navigate = useRouter();

  const handleNavigate = () => {
    if (user) {
      navigate.push('/dashboard/home');
    } else {
      navigate.push('/login');
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
          <h1>Automated <span>crypto</span> flipping system</h1>
          <button className="heroBtn" onClick={handleNavigate}>Get Started <span>→</span></button>
      </div>
    </div>
  )
}
