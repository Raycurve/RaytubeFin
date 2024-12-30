import { initializeApp } from "firebase/app";

import {getAuth, GoogleAuthProvider} from "firebase/auth";


//todo add these keys in .env later
const firebaseConfig = {
  apiKey: "AIzaSyAb7u7wzVgYn1t2_r_BtnYA6WkXhMpgSjU",
  authDomain: "raytubeauth.firebaseapp.com",
  projectId: "raytubeauth",
  storageBucket: "raytubeauth.firebasestorage.app",
  messagingSenderId: "928287436632",
  appId: "1:928287436632:web:38abae413019357db4bf2d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth  = getAuth();
export const provider = new GoogleAuthProvider();

export default app;