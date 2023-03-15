import { useState, useRef, Fragment } from "react";
import { VscCopy } from "react-icons/vsc";
import s from "./Funding.module.css";
import QR from "../../public/assets/QR.jpg";
import { useRouter } from "next/router";
import ImageUploading from 'react-images-uploading';
import { TextField } from '@mui/material';
import { MdCircle } from "react-icons/md";
import { db, storage } from "@/firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import dateFormat from "dateformat";
import { collection, addDoc } from "firebase/firestore";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";

type state = boolean | string | number | null | undefined


export default function Funding() {
  const [copy, setCopy] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [amount, setAmount] = useState<state>(20);
  const [error, setError] = useState(null);
  const [pending, setPending] = useState<state>(false);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState<any>([]);
  const textAreaRef = useRef(null);
  const navigate = useRouter();
  const { user } = useAuth()

  const handleImage = (imageList: any) => {
    setImages(imageList);
  };



  const handleClick =  (e: string) => {
    if (e === "copy") setCopy(true)
  }

  const btnClick =  (e: string) => {
    if (e === "back") navigate.push("/dashboard")
    if (e === "qr") setPage(2)
    if (e === "upload") setPage(3)
  }

  const copyToClipBoard = async (copyMe: string) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess(true)
      setTimeout(() => {
        setCopySuccess(false)
        setCopy(false)
      }, 3000);
    } catch (err: any) {
      setCopySuccess(err.message);
    }
  }

  const submitImage = async() => {
    setError(null)
    setPending(true)
    const image = images[0].file
    const imageRef = ref(storage, `transactions/${user.uid}/${image.name}`)


    try {
      // Upload proof of payment
      const uploadTask = uploadBytesResumable(imageRef, image);
      uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is  ${progress} % done`);
          }, (error) => {
            console.log(error.message)
          }, () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then(downloadURL =>
                addDoc(collection(db, "transactions"), {
                  amount: Number(amount),
                  user: user.email,
                  date: dateFormat(new Date(), "dd/mm/yyyy, h:MM:ss"),
                  proof: downloadURL
                }))
              .then(() => {
                setPending("done")
                setTimeout(() => setPending(false), 5000);
              })
              .catch((error) => setError(error.message))
        })
    } catch (err: any) {
      if(err) setError(err.message)
    }
  }

  const pageNavigation = (e: string) => {
    if (e === "deposit") setPage(1)
    if (e === "qr") setPage(2)
    if (e === "upload") setPage(3)
  }

  return (
    <div className={s.container}>
      <div className={s.navigation}>
        <div className={s.current}>
          <MdCircle onClick={() => pageNavigation("deposit")} size="1.2rem" style={page === 1 ? {color: "#05C169"} : {}}/>
          <MdCircle onClick={() => pageNavigation("qr")} size="1.2rem" style={page === 2 ? {color: "#05C169"} : {}}/>
          <MdCircle onClick={() => pageNavigation("upload")} size="1.2rem" style={page === 3 ? {color: "#05C169"} : {}}/>
        </div>
      </div>
      {page === 1 &&
      <div className={s.amount}>
        <h2>Deposit</h2>
        <TextField label="Amount" InputLabelProps={{ shrink: true }} onChange={(e) => setAmount(e.target.value)} value={amount} type="number"/>
        <button className='bigBtn full' style={{...overwrite}} onClick={() => btnClick("qr")}>Deposit  <span style={{...span}}>&rarr;</span></button>
        <button className="bigBtn full" style={{...overwrite}} onClick={() => btnClick("back")}>
          <span style={{...span2}}>&larr;</span> Back To Dashboard
        </button>
      </div>
      }
      {page === 2 &&
        <div className={s.CryptoFund}>
          <div className={s.qr}>
              <div id="qr" className={s.imgCtn}>
                <Image src={QR} alt="QR CODE" priority width="400" height="400"/>
              </div>
              <div className={s.address}>
                  <input
                  type="text"
                  ref={textAreaRef}
                  value="TCFfkiRoXrhSdTtN1Ta9VAyx9fRvztzNK5"
                  disabled
                  />
                <div className={s.icon}>
                  <a href="#icon" onClick={() => handleClick("copy")}>
                    <VscCopy onClick={() => copyToClipBoard("TCFfkiRoXrhSdTtN1Ta9VAyx9fRvztzNK5")} size="4em" style={copy ? {color: "#00e99b"} : {}}/>
                  </a>
                  {!copySuccess && <p>Copy</p>}
                  {copySuccess && <p>Copied!</p>}
                </div>
              </div>
          </div>

          <div className={s.text}>
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

      {page === 3 &&
        <ImageUploading multiple value={images} onChange={handleImage} maxNumber={1} dataURLKey="data_url" >
        {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
          // write your building UI
          <div className={s.uploadCtn} style={imageList.length > 0 ? {...someCtns} : undefined}  {...dragProps}>
            <button style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload}> Click or Drop here </button>
            {imageList.map((image, i) => (
              <Fragment key={i}>
                <div className={s.imgCtn2}>
                  <Image src={image['data_url']} alt="proof"/>
                <div className={s.btns2}>
                  <button className="bigBtn full" style={{...overwrite}} onClick={() => onImageUpdate(i)}>Update</button>
                  <button className="bigBtn full" style={{...overwrite}} onClick={() => onImageRemove(i)}>Remove</button>
                  <button className="bigBtn full" style={{...overwrite}} onClick={submitImage}>{(pending && pending !== "done") ? "Uploading..." : pending === "done" ? "Done" : "Upload"}</button>
                  {error && <p className="formError">{error}</p>}
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

  const someCtns = {
    minHeight: "auto",
    border: "none",
  }