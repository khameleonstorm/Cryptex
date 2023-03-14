import { useState, useEffect } from "react"
import { createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
import { Auth, db, storage } from "../firebase/config"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import dateFormat from "dateformat";
import { doc, setDoc } from "firebase/firestore"
import useAuth from "./useAuth"
import { useRouter } from "next/router";


interface person {
  fullName: string,
    email: string,
    phoneNumber: string,
    password: string,
    username: string,
    image: any,
    referral: string,
    country: string,
}


export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState<string|null>(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuth()
    const navigate = useRouter()

    const signUp = async({email, phoneNumber, password, username, image, referral, country, fullName}: person) => {

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
            
            const imageRef = ref(storage, `images/${res.user.uid}/${image.name}`)

            // Upload the file and metadata
            const uploadTask = uploadBytesResumable(imageRef, image);

            uploadTask.on('state_changed',
              (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                  case 'paused':
                    console.log('Upload is paused');
                    break;
                  case 'running':
                    console.log('Upload is running');
                    break;
                
                  default:
                    console.log("Uploading..")
                    break;
                }
              }, 
              (error) => {
                // Handle unsuccessful uploads
                setError(error.message)
              }, 
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                const imageUrl = downloadURL

                // update user profile
                updateProfile(res.user, { displayName: username, photoURL: imageUrl })

                // setting profile doc
                const docRef = doc(db, "profile", res.user.email)
                setDoc(docRef, {
                  online: true, 
                  displayName: username, 
                  uid: res.user.uid,
                  photoURL: imageUrl,
                  email: res.user.email,
                  phoneNumber,
                  fullName,
                  country,
                  referral,
                  lastLogin: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT"),
                  CreatedAt: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT"),
                  bal: {
                    cryptoBalance: 0,
                    fiatBalance: 0,
                    cryptoDeposit: 0,
                    fiatDeposit: 0,
                    totalWithdrawal: 0,
                    referralBonus: 0,
                  }
                })
            })
          }
        )

        // dispatch login case
        dispatch({type: "LOGIN", payload: res.user})


        if(!isCancelled){
            setIsPending(false)
            setError(null)
        }
        
        if(res.user.displayName === 'admin'){
          navigate.push('/admin')
        } else{
            navigate.push('/dashboard')
        }

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
