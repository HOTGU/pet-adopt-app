// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "react-native-b3ab1.firebaseapp.com",
  projectId: "react-native-b3ab1",
  storageBucket: "react-native-b3ab1.appspot.com",
  messagingSenderId: "697698687457",
  appId: "1:697698687457:web:d30eb01c6f96db019adaa0",
  measurementId: "G-EWGL7C11GY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, "(default)");
export const storage = getStorage(app);
