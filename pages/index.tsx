import Head from 'next/head'
import s from '@/styles/Home.module.css'
import useAuth from '@/hooks/useAuth';
import { MoonLoader } from 'react-spinners';

// Import components
import Nav from '@/components/nav/Nav';
import Hero from '@/components/hero/Hero';
import CryptoChart from '@/components/cryptoChart/CryptoChart';
import Footer from '@/components/footer/Footer';

export default function Home() {
      const { authIsReady } = useAuth();

      if(!authIsReady){
        return (
          <div className={s.spinnerContainer}>
            <div className={s.spinner}>
              <MoonLoader color="#1649ff" />
            </div>
          </div>
        )
      }


      if(authIsReady){
        return (
          <>
            <Head>
              <title>CTM PRO | Auto Crypto Flipping System</title>
              <meta name="description" content="CTM PRO Automated crypto flipping system. The easiest, safest, and fastest way to buy & sell crypto assets." />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta property="og:site_name" content="CTM PRO | Auto Crypto Flipping System" />
              <meta property="og:locale" content="en_US" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nav/>
            <Hero />
            <CryptoChart />
            <Footer />
          </>
        )

      }
}
