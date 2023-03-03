import styles from './Hero.module.css';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
          <h1> Buy & Sell Fiat & Crypto <span>Assets.</span></h1>
          <button className="heroBtn" onClick={handleNavigate}>Get Started <span>→</span></button>
      </div>
    </div>
  )
}
