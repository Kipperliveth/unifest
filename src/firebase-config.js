import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { useAuth } from "./App/App-auth/UseAuth";

// const currentUser = useAuth();

const firebaseConfig = {
  apiKey: "AIzaSyDd44qke0vR3Xe4pMOSmKPFlhUidqb3rwo",
  authDomain: "unifest-test.firebaseapp.com",
  projectId: "unifest-test",
  storageBucket: "unifest-test.appspot.com",
  messagingSenderId: "418160094867",
  appId: "1:418160094867:web:5fd1e8e69def2d5b03a766"
};

const app = initializeApp(firebaseConfig);
export const txtdb = getFirestore(app);
export const imgdb = getStorage(app);
export const auth = getAuth(app);

//profile pic
