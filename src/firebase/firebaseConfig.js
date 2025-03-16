// Firebase SDK'dan gerekli fonksiyonları içe aktar
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyCwcyEeaeyYJo1njWU6ms9I1U6P0PO_0C4",
  authDomain: "gympara-4f4d3.firebaseapp.com",
  databaseURL: "https://gympara-4f4d3-default-rtdb.firebaseio.com", // Realtime Database URL
  projectId: "gympara-4f4d3",
  storageBucket: "gympara-4f4d3.appspot.com",
  messagingSenderId: "216660689244",
  appId: "1:216660689244:web:0d0bb1db5ed0db7ce3c199",
  measurementId: "G-TWNW0G4WSL"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Firebase servislerini başlat
const analytics = getAnalytics(app);  // Firebase Analytics
const auth = getAuth(app);            // Authentication
const realtimeDB = getDatabase(app);  // Realtime Database
const firestoreDB = getFirestore(app); // Firestore
const storage = getStorage(app);       // Storage

// Servisleri dışa aktar
export { app, analytics, auth, realtimeDB, firestoreDB, storage };
