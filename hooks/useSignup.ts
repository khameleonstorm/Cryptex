import { useState, useEffect } from "react"
import { createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
import { Auth, db } from "../firebase/config"
import dateFormat from "dateformat";
import { doc, setDoc } from "firebase/firestore"
import useAuth from "./useAuth"
import { useRouter } from "next/router";


interface person {
  fullName: string,
  email: string,
  phoneNumber: string | number,
  password: string,
  username: string,
  referral: string | string[] | undefined,
  country: string,
}


export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuth()
    const navigate = useRouter()

    const signUp = async({email, phoneNumber, password, username, referral, country, fullName}: person) => {

        setError(null)
        setIsPending(true)

        try {
            // sign up user
            const res: any = await createUserWithEmailAndPassword(Auth, email, password)

            if (!res) {
              setError("Sorry, can't create an account")
              setIsPending(false)
              return
            }

            // update user profile
            updateProfile(res.user, { displayName: username })

            // setting profile doc
            const docRef = doc(db, "profile", res.user.email)
            setDoc(docRef, {
              online: true, 
              displayName: username, 
              uid: res.user.uid,
              email: res.user.email,
              phoneNumber,
              fullName,
              country,
              referral: {
                code: referral,
                isAdded: false,
              },
              lastLogin: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT"),
              CreatedAt: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT"),
              bal: { balance: 0, profit: 0, totalWithdrawal: 0, referralBonus: 0,}
            })

        // dispatch login case
        dispatch({type: "LOGIN", payload: res.user})


        if(!isCancelled){
            setIsPending(false)
            setError(null)
        }
        
        if(res.user.displayName === 'admin') navigate.push('/admin')
        else{navigate.push('/dashboard/home')}

        } catch (err: any) {
            if(err){
              console.log(err.message)
              setError(err.message)
              setIsPending(false)
              setTimeout(() => {
                  setError(null)
              }, 3000);
            }
        }

    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])


    return { error, isPending, signUp }
}
