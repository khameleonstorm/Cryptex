import styles from './InvestmentCard.module.css';
import { FaRegTimesCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { HiArrowSmRight } from "react-icons/hi";
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import useCollection from '../../hooks/useCollection';
// import { doc, updateDoc } from "firebase/firestore";
// import { db } from '../../firebase/config';
import { useEffect } from 'react';

export default function InvestmentCard({ title, subtitle, plans, showHeader }) {
  const { user, authIsReady } = useAuth()
  const [amount, setAmount] = useState(null);
  // const [plan, setPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { document } = useCollection('profile', true, false);
  const [filteredDoc, setFilteredDoc] = useState(null);
  const [modalError, setModalError] = useState(null);
  const [modalSuccess, setModalSuccess] = useState(null);

  useEffect(() => {
    if(user){
      if(document){
        setFilteredDoc(document.filter((doc) => doc.email === user.email))
      }
    }
  }, [document, user])

  // const resetInput = () => {
  //   setModalSuccess('Investment successful')
  //   setTimeout(() => {
  //     setShowModal(false)
  //     setAmount(null)
  //     setPlan(null)
  //     setModalError(null)
  //     setModalSuccess(null)
  //   }, 3000)
  // }

  // const errorManager = (error) => {
  //   setModalError(error)
  //   setTimeout(() => {
  //     setModalError(null)
  //   }, 3000)
  // }
  

  const handleInvest = (plan) => {
  //   setPlan(plan)
  //   setShowModal(true)
  // }

  // const handleSubmit = async(e) => {
  //   e.preventDefault();
  //   const ref = doc(db, "profile", user.email);
  //   if(filteredDoc){
  //     if(amount && plan){
  //       // parse amount to number
  //       const amountNumber = Number(amount);
  //       const { bal, fullName } = filteredDoc[0];

  //       // Trial plan investment
  //       if(plan === "Trial"){
  //         if(amountNumber === 100){
  //             if(bal.balance >= amountNumber){
  //             const newBal = bal.balance - amountNumber;
  //             const newInvest = bal.investment + amountNumber;
  //             const newBalances = {
  //               balance: newBal,
  //               investment: newInvest,
  //               profit: bal.profit,
  //               savings: bal.savings,
  //               withdrawal: bal.withdrawal,
  //             }

  //             await updateDoc(ref, {"bal": newBalances});
  //             resetInput();
  //           } else {
  //             errorManager('Insufficient balance')
  //           }
  //         } else {
  //           errorManager('Amount must be 100')
  //         }
  //       }


  //       // Promotion plan investment
  //       if(plan === "Promotion"){
  //         if(amountNumber === 1500){
  //           if(bal.balance >= amountNumber){
  //             const newBal = bal.balance - amountNumber;
  //             const newInvest = bal.investment + amountNumber;
  //             const newBalances = {
  //               balance: newBal,
  //               investment: newInvest,
  //               profit: bal.profit,
  //               savings: bal.savings,
  //               withdrawal: bal.withdrawal,
  //             }

  //             await updateDoc(ref, {"bal": newBalances });
  //             resetInput();
  //           } else {
  //             errorManager('Insufficient balance')
  //           }
  //         } else {
  //           errorManager('Amount must be 1500')
  //         }
  //       }

  //       // Expert plan investment
  //       if(plan === "Expert"){
  //         if(amountNumber === 3000){
  //           if(bal.balance >= amountNumber){
  //             const newBal = bal.balance - amountNumber;
  //             const newInvest = bal.investment + amountNumber;
  //             const newBalances = {
  //               balance: newBal,
  //               investment: newInvest,
  //               profit: bal.profit,
  //               savings: bal.savings,
  //               withdrawal: bal.withdrawal,
  //             }

  //             await updateDoc(ref, {"bal": newBalances });
  //             resetInput();
  //           } else {
  //             errorManager('Insufficient balance')
  //           }
  //         } else {
  //           errorManager('Amount must be 3000')
  //         }
  //       }


  //       // Exclusive plan investment
  //       if(plan === "Exclusive"){
  //         if(amountNumber === 5000){
  //           if(bal.balance >= amountNumber){
  //             const newBal = bal.balance - amountNumber;
  //             const newInvest = bal.investment + amountNumber;
  //             const newBalances = {
  //               balance: newBal,
  //               investment: newInvest,
  //               profit: bal.profit,
  //               savings: bal.savings,
  //               withdrawal: bal.withdrawal,
  //             }

  //             await updateDoc(ref, {"bal": newBalances });
  //             resetInput();
  //           } else {
  //             errorManager('Insufficient balance')
  //           }
  //         } else {
  //           errorManager('Amount must be 5000')
  //         }
  //       }


  //       // Premium plan investment
  //       if(plan === "Premium"){
  //         if(amountNumber === 10000){
  //           if(bal.balance >= amountNumber){
  //             const newBal = bal.balance - amountNumber;
  //             const newInvest = bal.investment + amountNumber;
  //             const newBalances = {
  //               balance: newBal,
  //               investment: newInvest,
  //               profit: bal.profit,
  //               savings: bal.savings,
  //               withdrawal: bal.withdrawal,
  //             }

  //             await updateDoc(ref, {"bal": newBalances });
  //             resetInput();
  //           } else {
  //             errorManager('Insufficient balance')
  //           }
  //         } else {
  //           errorManager('Amount must be 10000')
  //         }
  //       }
  //     }
  //   }


    setTimeout(() => {
    }, 3000)
  }

  const handleSubmit = () => {}




  return (authIsReady &&
    <>
    {showHeader && 
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    }

    {showModal &&
      <div className={styles.modal}>
        <div className={styles.modalcontent}>
          <form onSubmit={handleSubmit}>
            {!modalSuccess && <h1>Enter Amount</h1>}
            {modalSuccess && <h1 style={{color: "#00ff00"}}>{modalSuccess}</h1>}
            <TextField 
              id="Amount" 
              label="Amount" 
              variant="outlined" 
              fullWidth
              type="number"
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className={styles.btns}>
              <Button 
              variant="contained"  
              type="submit"
              className={styles.submit}
              >Invest</Button>
              <p className={styles.cancel} onClick={() => setShowModal(false)}>Cancel</p>
            </div>
            {modalError && <p className={styles.error}>{modalError}</p>}
          </form>
        </div>
      </div>
    }
    <div className={styles.container} id="pricing">
      {plans.map(plan  =>
        <div className={styles.card} key={plan.id}>
          <div className={styles.content3} style={{ background: plan.background}}>
          </div>
          <div className={styles.content1}>
            <h2>{plan.title}</h2>
            <h3>{plan.amount}</h3>
            <p>{plan.desc}</p>
            <span></span>
          </div>
          <div className={styles.content2}>
          {plan.falsepoints.map(falsepoint => <div key={falsepoint} className={styles.fact1}><span><FaRegTimesCircle /><p>{falsepoint}</p></span></div>) }
          {plan.truepoints.map(truepoint => <div key={truepoint} className={styles.fact2}><span><FaRegCheckCircle /><p>{truepoint}</p></span></div>) }
          </div>
          <div className={styles.buttons}>
            {!user &&
            <>
              <Link to="/login" className={styles.button1}>Get Started</Link>
              <Link to="/plans" className={styles.button2}>
                Learn More <HiArrowSmRight color={`${plan.background}`}/>
              </Link>
            </>
            }
            {user &&
              <Link to="#" className={styles.button1} onClick={() => handleInvest(plan.title)}>Invest</Link>
            }
          </div>
        </div>
      )}
    </div>
    </>
  )
}
