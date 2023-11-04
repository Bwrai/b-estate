// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRBASE_API_KEY,
  authDomain: "bwraiestate.firebaseapp.com",
  projectId: "bwraiestate",
  storageBucket: "bwraiestate.appspot.com",
  messagingSenderId: "743272088476",
  appId: "1:743272088476:web:e5b42c9e1ffd165cb67e59"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);