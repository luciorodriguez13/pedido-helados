// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ← este es el que falta

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPNi8G9ifgYbxQOk3YEjFqOwJKwo-DwDE",
  authDomain: "pedido-helados-2ba1c.firebaseapp.com",
  projectId: "pedido-helados-2ba1c",
  storageBucket: "pedido-helados-2ba1c.firebasestorage.app",
  messagingSenderId: "1000641230235",
  appId: "1:1000641230235:web:bc5ef8260322f12beadd3e",
  measurementId: "G-6YP7ERH76X"
};

// Initialize Firebase
export const db = getFirestore(initializeApp(firebaseConfig));