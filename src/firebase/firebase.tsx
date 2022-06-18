// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYELTUmPug2_hTs7f_rfVhR4TVlLcyKrs",
  authDomain: "food-bank-6e406.firebaseapp.com",
  projectId: "food-bank-6e406",
  storageBucket: "food-bank-6e406.appspot.com",
  messagingSenderId: "608759665943",
  appId: "1:608759665943:web:ab3d8bb57c152e504f5352",
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = getFirestore(app);
