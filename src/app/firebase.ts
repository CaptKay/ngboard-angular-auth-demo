// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjWUbcyEFCxjMzWvZ7LVSnZE84trYgjs8",
  authDomain: "ngboard-auth.firebaseapp.com",
  projectId: "ngboard-auth",
  storageBucket: "ngboard-auth.firebasestorage.app",
  messagingSenderId: "964329474946",
  appId: "1:964329474946:web:2b4f6ecc363bc9264a5d9b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Export the auth instance for the rest of the app
export const firebaseAuth = getAuth(app)
export const firebaseDb = getFirestore(app)