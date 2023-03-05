// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFeBaJoBPmgj7Tkc05VlNUQhvIVTEdOE8",
  authDomain: "cs35l-project-ced87.firebaseapp.com",
  projectId: "cs35l-project-ced87",
  storageBucket: "cs35l-project-ced87.appspot.com",
  messagingSenderId: "124006636557",
  appId: "1:124006636557:web:6fa3819f901417aba3c944",
  measurementId: "G-39KPLZRWF4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth();