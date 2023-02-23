import styles from './Hero.module.css';
import useAuth from '../../hooks/useAuth';
import Converter from "../converter/Converter"
// import ngn from "../../assets/ngnConvert.png"

export default function Hero() {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          {/* <img src={ngn} alt='convert' className={styles.ngn}/> */}
          <h1>Convert</h1>
          <h2>{"(Naira > Dollar > Cedis)"}</h2>
          <p> Coin Cryptex is the easiest, safest, and fastest way to buy, sell & exchange fiat &   crypto assets.</p>
          <button className={styles.btn}>Get Started <span>→</span></button>
        </div>
        <div className={styles.right}>
          <Converter />
        </div>
      </div>
    </div>
  )
}
