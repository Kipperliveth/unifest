import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD94qx7VBznmusc7azqiszt448LQUHB5U4",
  authDomain: "evanis-interiors.firebaseapp.com",
  projectId: "evanis-interiors",
  storageBucket: "evanis-interiors.appspot.com",
  messagingSenderId: "132710498396",
  appId: "1:132710498396:web:787e10eced7f673acfe699",
  measurementId: "G-P6R2GHQHDB",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
