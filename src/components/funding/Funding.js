import { useState, useRef, useEffect, Fragment } from "react";
import { VscCopy } from "react-icons/vsc";
import styles from "./Funding.module.css";
import QR from "../../assets/QR.jpg";
import { useNavigate } from "react-router-dom";
import ImageUploading from 'react-images-uploading';


export default function Funding() {
  const [copy, setCopy] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [proof, setProof] = useState(false);
  const [images, setImages] = useState([]);
  const textAreaRef = useRef(null);
  const navigate = useNavigate();

  const handleImage = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };



  const handleClick =  (e) => {
    if (e === "copy") setCopy(true)
  }

  const btnClick =  (e) => {
    if (e === "back") navigate("/dashboard")
    if (e === "upload") setProof(true)
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

  const submitImage = () => {
    console.log(images[0])
  }

  return (
    <div className={styles.container}>
      {!proof &&
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

          <button className="bigBtn full" style={{...overwrite}} onClick={() => btnClick("back")}>
          <span style={{...span2}}>&larr;</span> Back To Dashboard
          </button>
          <button className="bigBtn full" style={{...overwrite}} onClick={() => btnClick("upload")}>
            Upload Payment Proof <span style={{...span}}>&rarr;</span>
          </button>
        </div>
      }

      {proof &&
        <ImageUploading multiple value={images} onChange={handleImage} maxNumber={1} dataURLKey="data_url" >
        {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
          // write your building UI
          <div className={styles.uploadCtn} style={imageList.length > 0 ? {...someCtnStyles} : undefined}  {...dragProps}>
            <button style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload}> Click or Drop here </button>
            {imageList.map((image, i) => (
              <Fragment key={i}>
                <div className={styles.imgCtn2}>
                  <img src={image['data_url']} alt="proof"/>
                <div className={styles.btns2}>
                  <button className="bigBtn full" style={{...overwrite}} onClick={() => onImageUpdate(i)}>Update</button>
                  <button className="bigBtn full" style={{...overwrite}} onClick={() => onImageRemove(i)}>Remove</button>
                  <button className="bigBtn full" style={{...overwrite}} onClick={submitImage}>Upload</button>
                </div>
                </div>
              </Fragment>
            ))}
          </div>
        )}
      </ImageUploading>
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

  const span2 = {
    fontSize: "1.5em",
    paddingRight: "1em",
  }

  const someCtnStyles = {
    minHeight: "auto",
    border: "none",
  }