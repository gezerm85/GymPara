// Firebase SDK'dan gerekli fonksiyonları içe aktar
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyArV2nUqO4kofpWd5OEZFcIpJOcfd_wM6w",
  authDomain: "gympara-9e2e2.firebaseapp.com",
  projectId: "gympara-9e2e2",
  storageBucket: "gympara-9e2e2.firebasestorage.app",
  messagingSenderId: "348298072760",
  appId: "1:348298072760:web:fdabcbfdf26067e3299a4d",
  measurementId: "G-3TJY33H15T"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Firebase servislerini başlat
let analytics = null;
// Analytics'i sadece desteklenen ortamlarda başlat
isSupported().then(yes => yes ? analytics = getAnalytics(app) : null);

// Auth'u AsyncStorage ile başlat
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const realtimeDB = getDatabase(app);  // Realtime Database
const firestoreDB = getFirestore(app); // Firestore
const storage = getStorage(app);       // Storage

// Servisleri dışa aktar
export { app, analytics, auth, realtimeDB, firestoreDB, storage };
