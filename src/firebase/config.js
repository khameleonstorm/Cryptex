import { initializeApp, getApps, getApp } from '@firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "@firebase/auth";
import { getStorage } from "firebase/storage";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhzeSrnaPTWNjzuFtFndNiDyYjObm7FwM",
  authDomain: "cryptex-db.firebaseapp.com",
  projectId: "cryptex-db",
  storageBucket: "cryptex-db.appspot.com",
  messagingSenderId: "77065066306",
  appId: "1:77065066306:web:f8a3cbd78435d409cc5adb",
  measurementId: "G-F6G7RN33GK"
};
// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp(); 

// init services
  const db = getFirestore(app)
  const Auth = getAuth(app)
  const storage = getStorage(app);

  
  export { db, storage, Auth }