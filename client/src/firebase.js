// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "newestate-70e7f.firebaseapp.com",
  projectId: "newestate-70e7f",
  storageBucket: "newestate-70e7f.appspot.com",
  messagingSenderId: "1090921419250",
  appId: "1:1090921419250:web:9ecbd9c3e01283ec9f5b6b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);