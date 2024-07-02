import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { useAuth } from "./App/App-auth/UseAuth";

// const currentUser = useAuth();

const firebaseConfig = {
  apiKey: "AIzaSyBUvj4sKKJhm_VWYIMtwXzdo6uu-Woxbg8",
  authDomain: "evanis-c418c.firebaseapp.com",
  projectId: "evanis-c418c",
  storageBucket: "evanis-c418c.appspot.com",
  messagingSenderId: "423255700376",
  appId: "1:423255700376:web:11c8ca51e52a9834d2b1ed",
  measurementId: "G-D8Q1M852EX"
};

const app = initializeApp(firebaseConfig);
export const txtdb = getFirestore(app);
export const imgdb = getStorage(app);
export const auth = getAuth(app);

//profile pic
