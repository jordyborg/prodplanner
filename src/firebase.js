// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdhvLNasFwqYYeT5x7K4hKcstCay19maM",
  authDomain: "prodplanner-a667f.firebaseapp.com",
  projectId: "prodplanner-a667f",
  storageBucket: "prodplanner-a667f.appspot.com",
  messagingSenderId: "945041933952",
  appId: "1:945041933952:web:2b7159830a5f4b8ae00865",
  measurementId: "G-5P9846WT5X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig); //initializing the app
export const db = getFirestore(app); //getting the Firestore with our app
const analytics = getAnalytics(app);

