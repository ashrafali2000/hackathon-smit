// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "hackathon-final-ca3e8.firebaseapp.com",
  projectId: "hackathon-final-ca3e8",
  storageBucket: "hackathon-final-ca3e8.appspot.com",
  messagingSenderId: "261345270707",
  appId: "1:261345270707:web:b556665d6d7271475ec9c6",
  measurementId: "G-PSC5YTRLYJ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
