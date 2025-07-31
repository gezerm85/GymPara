// src/firebase/firebaseAuth.js
import { auth, firestoreDB } from "./firebaseConfig";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

// Kullanıcı Kaydı
export const register = async (email, password, fullName) => {
  if (!email || !password || !fullName) {
    throw new Error("Lütfen tüm alanları doldurun.");
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Firestore'a temel kullanıcı verisi kaydet
    await setDoc(doc(firestoreDB, "users", user.uid), {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      createdAt: serverTimestamp(),
    });

    return { uid: user.uid, email: user.email };
  } catch (error) {
    throw new Error(error.message || "Kayıt sırasında bir hata oluştu.");
  }
};

// Kullanıcı Girişi
export const signIn = async (email, password) => {
  if (!email || !password) {
    throw new Error("E-posta ve şifre gereklidir.");
  }
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return { uid: user.uid, email: user.email };
  } catch (error) {
    throw new Error(error.message || "Giriş sırasında bir hata oluştu.");
  }
};

// Kullanıcı Çıkışı
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return true;
  } catch (error) {
    throw new Error(error.message || "Çıkış sırasında bir hata oluştu.");
  }
};
