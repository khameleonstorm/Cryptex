import { useState, useRef, useEffect } from "react";
import { VscCopy } from "react-icons/vsc";
import styles from "./Funding.module.css";
import QR from "../../assets/QR.jpg";


export default function Funding() {
  const [copy, setCopy] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const textAreaRef = useRef(null);


  const handleClick =  (e) => {
    if (e === "copy") setCopy(true)
  }

  const btnClick =  (e) => {
    if (e === "pay") window.location = "https://wa.me/message/X7T6XZWN4MNVL1"
  }
  

  useEffect(() => {
    const imgCtn = document.getElementById('qr')
    const img = new Image();
    img.src = QR;
    img.alt = 'QR CODE';
    img.loading = 'lazy';
    img.width = 400;
    img.height = 400;
    imgCtn.appendChild(img);

    return () => imgCtn && imgCtn.removeChild(img)
  }, []);

  const copyToClipBoard = async copyMe => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false)
        setCopy(false)
      }, 3000);
    } catch (err) {
      setCopySuccess(err.message);
    }
  }

  return (
    <div className={styles.container}>
      {
        <div className={styles.CryptoFund}>
          <div className={styles.qr}>
              <div id="qr" className={styles.imgCtn}></div>
              <div className={styles.address}>
                  <input
                  type="text"
                  ref={textAreaRef}
                  value="TCFfkiRoXrhSdTtN1Ta9VAyx9fRvztzNK5"
                  disabled
                  />
                <div className={styles.icon}>
                  <a href="#icon" onClick={() => handleClick("copy")}>
                    <VscCopy onClick={() => copyToClipBoard("TCFfkiRoXrhSdTtN1Ta9VAyx9fRvztzNK5")} size="4em" style={copy && {color: "#00e99b"}}/>
                  </a>
                  {!copySuccess && <p>Copy</p>}
                  {copySuccess && <p>Copied!</p>}
                </div>
              </div>
          </div>

          <div className={styles.text}>
            <p>Send only <span>USDT(TRC 20) </span>to this address, sending any other coin may result to permanent loss</p>
          </div>

          <button className="bigBtn full" style={{...overwrite}} onClick={() => btnClick("pay")}>
            Pay via CTM exchange <span style={{...span}}>&rarr;</span>
          </button>
          <button className="bigBtn full" style={{...overwrite}} onClick={() => btnClick("upload")}>
            Upload Payment Proof <span style={{...span}}>&rarr;</span>
          </button>
        </div>
      }

    </div>
  )
  }



  const overwrite = {
    background: "none",
    border: "1px solid #000000",
  }

  const span = {
    fontSize: "1.5em",
    paddingLeft: "1em",
  }