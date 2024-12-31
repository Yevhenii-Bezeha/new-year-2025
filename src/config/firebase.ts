import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7x8_38o4UZNP6PFDScarlyc_BICnYZVw",
  authDomain: "together-time-evening.firebaseapp.com",
  projectId: "together-time-evening",
  storageBucket: "together-time-evening.firebasestorage.app",
  messagingSenderId: "648074298402",
  appId: "1:648074298402:web:ff53bb50cad716f0fcf67b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
