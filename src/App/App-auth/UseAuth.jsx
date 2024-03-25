import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../../firebase-config";
import { imgdb } from "../../firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}

export async function upload(file, currentUser, setLoading) {
  if (!currentUser) {
    console.error("User not authenticated.");
    return;
  }
  const fileRef = ref(imgdb, currentUser.uid + ".png");

  setLoading(true);

  const snapShot = await uploadBytes(fileRef, file);

  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, { photoURL });

  setLoading(false);
  alert("file uploaded!");
}
