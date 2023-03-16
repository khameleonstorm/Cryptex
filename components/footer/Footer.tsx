import Link from 'next/link';
import s from './Footer.module.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaTelegramPlane } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import Image from 'next/image';


export default function Footer() {
  return (
    <div className={s.container}>
      <div className={s.address}>
        <Image src="/assets/CPLOGO9.png" width={130} height={60} alt="logo" />
        <p>Address: No 21 Bekwere Wosu Street D&apos;line portharcourt </p>
        <h2>Email</h2>
        <a href="mailto:info@ctmpro.co.uk">info@ctmpro.co.uk</a>
        <h2>Phone</h2>
        <a href="tel:+2347044066175"><span>NIG</span>+2347044066175</a>
        <a href="tel:+233257777315"><span>GN</span>+233257777315</a>
      </div>
      <div className={s.links}>
        <h2>Useful Links</h2>
        <Link href="/home">Home</Link>
        <Link href="/about">About</Link>
        <Link href="#contact">Contact</Link>
      </div>
      <div className={s.services}>
        <h2>Services</h2>
        <Link href="#services">Trading</Link>
        <Link href="/plans">Investment</Link>
        <Link href="#contact">Consultancy</Link>
        <Link href="#contact">Signals</Link>
      </div>
      <div className={s.socials}>
        <h2>Our Social Networks</h2>
        <p>connect with us on our social network.</p>
        <div className={s.icons}>
          <Link href="#"><FaFacebookF /></Link>
          <Link href="#"><FaTwitter /></Link>
          <Link href="#"><FaLinkedinIn /></Link>
          <Link href="#"><FaTelegramPlane /></Link>
          <Link href="#"><AiFillInstagram /></Link>    
        </div>
      </div>
    </div>
  )
}
