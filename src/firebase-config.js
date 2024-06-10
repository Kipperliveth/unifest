import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { useAuth } from "./App/App-auth/UseAuth";

// const currentUser = useAuth();

const firebaseConfig = {
  apiKey: "AIzaSyAlo5r0kYGWQpeNJq8b85YFAocSR7dzblg",
  authDomain: "evanisfour-97686.firebaseapp.com",
  projectId: "evanisfour-97686",
  storageBucket: "evanisfour-97686.appspot.com",
  messagingSenderId: "105670815210",
  appId: "1:105670815210:web:ee23ac63f8f9712ce95693",
  measurementId: "G-L30BX9RZNC"
};

const app = initializeApp(firebaseConfig);
export const txtdb = getFirestore(app);
export const imgdb = getStorage(app);
export const auth = getAuth(app);

//profile pic
