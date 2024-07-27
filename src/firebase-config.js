import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { useAuth } from "./App/App-auth/UseAuth";

// const currentUser = useAuth();

const firebaseConfig = {
  apiKey: "AIzaSyD6mrDcDJ_HXRZU51404BY1PEC5o0ETWFo",
  authDomain: "unifest-70d85.firebaseapp.com",
  projectId: "unifest-70d85",
  storageBucket: "unifest-70d85.appspot.com",
  messagingSenderId: "203847567557",
  appId: "1:203847567557:web:e758b55ca16fabb539c8ac"
};


const app = initializeApp(firebaseConfig);
export const txtdb = getFirestore(app);
export const imgdb = getStorage(app);
export const auth = getAuth(app);

//profile pic
