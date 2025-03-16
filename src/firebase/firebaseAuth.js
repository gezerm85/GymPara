// src/firebase/firebaseAuth.js
import { auth, firestoreDB } from "./firebaseConfig";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

// 🔹 Kullanıcı Kaydı (Register)
export const register = async (email, password, fullName) => {
  try {
    console.log("Kayıt İşlemi Başladı:");
    console.log("Email:", email);
    console.log("Şifre:", password);
    console.log("İsim:", fullName);

    // Email, password ve fullName boş olmamalı
    if (!email || !password || !fullName) {
      throw new Error("Lütfen tüm alanları doldurun.");
    }

    // Firebase Authentication ile kullanıcı oluştur
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("Firebase Kullanıcısı Oluşturuldu:", user.uid);

    // JSON formatında yanlış karakterleri temizle
    const userData = {
      fullName: fullName.trim(), // Gereksiz boşlukları temizle
      email: email.trim().toLowerCase(), // Küçük harfe çevir
      createdAt: serverTimestamp(),
    };

    console.log("Firestore'a Kaydedilecek Kullanıcı Verisi:", userData);

    // Firestore veritabanına kullanıcı bilgilerini kaydet
    await setDoc(doc(firestoreDB, "users", user.uid), userData);

    console.log("Firestore'a Kullanıcı Kaydedildi.");
    return user;
  } catch (error) {
    console.error("Kayıt Hatası:", error);
    throw error;
  }
};


// 🔹 Kullanıcı Girişi (Sign In)
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};
