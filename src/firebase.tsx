// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiccgQVT_MQ6CWZJlqpYT6qOz6Rbpepm8",
  authDomain: "mosque-demo.firebaseapp.com",
  projectId: "mosque-demo",
  storageBucket: "mosque-demo.appspot.com",
  messagingSenderId: "562065865173",
  appId: "1:562065865173:web:fb8be6e4e477de710a255c",
};

// Initialize Firebase

export const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
