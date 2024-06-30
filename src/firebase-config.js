import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { useAuth } from "./App/App-auth/UseAuth";

// const currentUser = useAuth();

const firebaseConfig = {
  apiKey: "AIzaSyD93DuX01t9oX_sVufOiGAGlbE9UNPkDMA",
  authDomain: "evanis5.firebaseapp.com",
  projectId: "evanis5",
  storageBucket: "evanis5.appspot.com",
  messagingSenderId: "554903166465",
  appId: "1:554903166465:web:df74453b59dc710295ea00",
  measurementId: "G-EKNVM2P7YS"
  
};

const app = initializeApp(firebaseConfig);
export const txtdb = getFirestore(app);
export const imgdb = getStorage(app);
export const auth = getAuth(app);

//profile pic
