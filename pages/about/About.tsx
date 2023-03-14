// css import
import styles from './About.module.css';
import useAuth from '@/hooks/useAuth';

// component
import Nav from '@/components/nav/Nav';
import Hero from '@/components/hero/Hero';
import Footer from '@/components/footer/Footer';


export default function About() {
  const { authIsReady } = useAuth();


  return (authIsReady &&
    <div className={styles.container}>
      <Nav />
      <Hero />
      <Footer />
    </div>
  )
}
