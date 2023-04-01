// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiI_5JUBDX6L1KDv_1i98BxvTN9nioZeU",
  authDomain: "ecomerce-app-21d85.firebaseapp.com",
  projectId: "ecomerce-app-21d85",
  storageBucket: "ecomerce-app-21d85.appspot.com",
  messagingSenderId: "133799332619",
  appId: "1:133799332619:web:82ee884c3d72f824b5f00e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app