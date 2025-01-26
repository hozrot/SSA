import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyBVXMjAvZqxiQ-W6t3VjJfM7SDtV9VEnm0",
    authDomain: "ssa2025-27868.firebaseapp.com",
    databaseURL: "https://ssa2025-27868-default-rtdb.firebaseio.com",
    projectId: "ssa2025-27868",
    storageBucket: "ssa2025-27868.firebasestorage.app",
    messagingSenderId: "603020412560",
    appId: "1:603020412560:web:abb2c2b1fe95a0e9fdba15",
    measurementId: "G-7H45XS6WDV"
  }

  if (firebase.apps.length===0){
    firebase.initializeApp(firebaseConfig);
  }
  const db = getDatabase();

  export {db}