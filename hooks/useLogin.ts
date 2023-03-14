import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { Auth, db } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { doc, updateDoc } from "firebase/firestore"; 

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuth()
    const navigate = useRouter()

    // creating a logout function
    const login = async ({email, password}: {email: string, password: string}) => {
        setError(null)
        setIsPending(true)

        try {
            const res: any = await signInWithEmailAndPassword(Auth, email, password)

            if (!res) throw new Error("Can't login at the moment")
            
            const docRef = doc(db, 'profile', res.user.email)

            await updateDoc(docRef, {online: true})
            
            // dispatching a logout function
            dispatch({ type: 'LOGIN', payload: res.user })
            
            if(!isCancelled){
              setError(null)
              setIsPending(false)
            }
            
          } catch (err: any) {
            if(err){
              setError(err.message)
              setTimeout(() => setError(null), 5000);
              setIsPending(false)
            }
          }

        // Load the dashboard page using dynamic import
        import('../pages/dashboard').then((module) => {
          const Dashboard = module.default
              navigate.push("/dashboard/home")
        })
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { error, isPending, login }
    
}