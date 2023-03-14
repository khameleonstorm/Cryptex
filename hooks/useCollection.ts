import { collection, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../firebase/config"
import { useEffect, useState } from "react"
import useAuth from './useAuth'


export default function useCollection(coll: string, allUsers: boolean, singleUser: boolean) {
  const [doc, setDoc] = useState<object[] | null>(null)
  const [error, setError] = useState<string|null>(null)
  const { user, authIsReady } = useAuth()
  const [ isPending, setIsPending ] = useState(false)

  useEffect(() => {

    if(authIsReady && user){
      setIsPending(true)
      let q = query(collection(db, coll), where("email", "==", user.email))
  
      if (singleUser) {
        q = query(collection(db, coll), where("email", "==", user.email))
      } 
  
      if (allUsers) {
        q = query(collection(db, coll))
      } 
      
      const unsubscribe = onSnapshot(
        q, 
        (snapshot) => {
          let results: Array<object> = []
          snapshot.forEach(doc => {
            results.push({ ...doc.data(), id: doc.id})
          })

            // setting doc state
            setDoc(results)
            setError(null)
            setIsPending(false)

        },
        (error) => {
          // ...setting error param
          setError("could not fetch data frm the database.....")
          console.log(error.message)
        });
  
        return () => unsubscribe()
    }
  }, [coll, user, allUsers, singleUser, authIsReady])

  return { error, doc, isPending }

}
