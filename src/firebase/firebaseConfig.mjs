import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "dotenv/config";

const firebaseConfig = {
  apiKey: process.env.KEY,
  authDomain: process.env.DOMAIN,
  projectId: process.env.ID,
  storageBucket: process.env.BUCKET,
  messagingSenderId: process.env.MSGID,
  appId: process.env.APPID,
};
console.log(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exporta as instâncias do Firestore e Auth
export const db = getFirestore(app);
export const auth = getAuth(app);