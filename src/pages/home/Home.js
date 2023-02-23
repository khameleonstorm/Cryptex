// Import css modules stylesheet as styles
import styles from './Home.module.css';
import useAuth from '../../hooks/useAuth';
import { MoonLoader } from 'react-spinners';

// Import components
import Nav from '../../components/nav/Nav';
import Hero from '../../components/hero/Hero';
import Footer from '../../components/footer/Footer';
import SectionTrend from '../../components/sectionTrend/SectionTrend';

// import texts from utils 




export default function Home() {
  const { authIsReady } = useAuth();

  if(!authIsReady){
    return (
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}>
          <MoonLoader color="#1649ff" />
        </div>
      </div>
    )
  }


  if(authIsReady){
    return (
      <>
        <Nav />
        <Hero />
        <SectionTrend />
        <Footer />
      </>
    )

  }
}
