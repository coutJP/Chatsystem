import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBsE2xQyXKyUpzT51FYKoLJdABJfoE4RuI",
  authDomain: "chat2-e1a61.firebaseapp.com",
  projectId: "chat2-e1a61",
  storageBucket: "chat2-e1a61.appspot.com",
  messagingSenderId: "970933226874",
  appId: "1:970933226874:web:f30574ef6f2a23eb891ac3"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db =getFirestore()
