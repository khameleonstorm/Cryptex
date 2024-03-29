import { db, storage } from "../firebase/config";
import { collection, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore"; 
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth"
import {  useEffect, useReducer, useState } from 'react';
import useAuth from "./useAuth"


let initialState = {
    doc: null,
    isPending: false,
    error: null,
    success: null
}


const firestoreReducer = (state: any, action: any) => {
    switch (action.type) {
        case "IS_PENDING":
            return {isPending: true, doc: null, error: null, success: null}
        case "SET_DOC":
            return {isPending: false, doc: action.payload, error: null, success: true}
        case "DELETE_DOC":
            return {isPending: false, doc: null, error: null, success: true}
        case "ERROR":
            return {isPending: false, doc: null, error: action.payload, success: null}
        case "DONE":
            return {isPending: false, doc: null, error: null, success: null}

        default:
            return state;
    }
}

export function useFirestore(coll: string) {
    const [notCancelled, setNotCancelled] = useState(true)
    const [res, dispatch] = useReducer(firestoreReducer, initialState)
    const { user } = useAuth()
    const [ isPending, setIsPending ] = useState(false)


    const addDocument = async(data: object) => {
        const docRef = collection(db, coll)

        try {
            if (notCancelled) {
                dispatch({type: "IS_PENDING"})

                const document: {[key: string]: string}| any = await addDoc(docRef, data)
    
                dispatch({type: "SET_DOC", payload: document})
                
                return document
            }

        } catch (error: any) {
            if (notCancelled) {dispatch({type: "ERROR", payload: error.message})
        }
      }
    }
    
    const updateprofile = async(data: object, file: File, displayName: string) => {
        setIsPending(true)
        const docRef = doc(db, coll, user.uid)
        
        try {
            if (notCancelled) {
                dispatch({type: "IS_PENDING"})

                await updateDoc(docRef, data)

                const imageRef = ref(storage, `images/${user.uid}/${file.name}`)

                // Upload the file and metadata

                const uploadTask = uploadBytesResumable(imageRef, file);

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
                    console.log(error)
                  }, 
                  () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        const imageUrl = downloadURL
                        updateProfile(user, { displayName: displayName, photoURL: imageUrl })

                    })
                  }
                )
    
                dispatch({type: "SET_DOC", payload: docRef})
                setIsPending(false)
            }

        } catch (error: any) {
            if (notCancelled) {
                dispatch({type: "ERROR", payload: error.message})
                setIsPending(false)
            }
        }
    }

    const deleteDocument = async(id: string) => {
        const docRef = doc(db, coll, id)

        try {
            if (notCancelled) {
                dispatch({type: "IS_PENDING"})

                await deleteDoc(docRef)
    
                dispatch({type: "DELETE_DOC"})
            }

        } catch (error: any) {
            if (notCancelled) {
                dispatch({type: "ERROR", payload: error.message})
            }
        }
    }
    
    useEffect(()=>{
        if (res) setNotCancelled(true)

        return () => setNotCancelled(false)
    }, [res])

    return { addDocument, res, deleteDocument, updateprofile, isPending }
}
