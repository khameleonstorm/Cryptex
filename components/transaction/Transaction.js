import styles from './Transaction.module.css';
import { BsArrowDownLeft, BsArrowUpRight }  from "react-icons/bs"
import { GiWallet }  from "react-icons/gi"

export default function Transaction() {
  return (
    <div className={styles.container}>
      <BsArrowDownLeft />
      <BsArrowUpRight />
      <GiWallet />
    </div>
  )
}
