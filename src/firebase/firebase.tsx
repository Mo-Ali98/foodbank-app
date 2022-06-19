// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
 
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = getFirestore(app);
