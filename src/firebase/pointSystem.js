import { firestoreDB, auth } from './firebaseConfig';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';

// Spor türlerine göre puan değerleri
const SPORT_POINTS = {
  "Futbol": 50,
  "Koşu": 40,
  "Yürüyüş": 20,
  "Bisiklet": 35,
  "Yüzme": 45,
  "Basketbol": 50,
  "Tenis": 40,
  "Voleybol": 45,
  "Evde Fitness": 30,
  "Pilates": 25,
  "Yoga": 20,
  "Ağırlık Kaldırma": 40,
  "Kardiyo": 35,
  "HIIT": 60,
  "Dans": 30,
  "Mountain Climbing": 50,
  "Rowing": 40,
  "Elliptical": 35,
  "Haftalık Hedef Tamamlama": 100,
};

// Kullanıcının puanını getir
export const getUserPoints = async (userId) => {
  try {
    const userDoc = await getDoc(doc(firestoreDB, 'user_points', userId));
    if (userDoc.exists()) {
      return userDoc.data().points || 0;
    } else {
      // Kullanıcı yoksa 0 puan ile başlat
      await setDoc(doc(firestoreDB, 'user_points', userId), {
        points: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return 0;
    }
  } catch (error) {
    console.error('Puan getirme hatası:', error);
    return 0;
  }
};

// Kullanıcıya puan ekle
export const addUserPoints = async (userId, sportName) => {
  try {
    const pointsToAdd = SPORT_POINTS[sportName] || 25; // Varsayılan 25 puan
    
    const userPointsRef = doc(firestoreDB, 'user_points', userId);
    const userDoc = await getDoc(userPointsRef);
    
    if (userDoc.exists()) {
      // Kullanıcı varsa puanı güncelle
      await updateDoc(userPointsRef, {
        points: increment(pointsToAdd),
        updatedAt: new Date(),
        lastSport: sportName,
        lastPointsEarned: pointsToAdd
      });
    } else {
      // Kullanıcı yoksa yeni kayıt oluştur
      await setDoc(userPointsRef, {
        points: pointsToAdd,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSport: sportName,
        lastPointsEarned: pointsToAdd
      });
    }
    
    return pointsToAdd;
  } catch (error) {
    console.error('Puan ekleme hatası:', error);
    throw error;
  }
};

// Spor türüne göre puan değerini getir
export const getSportPoints = (sportName) => {
  return SPORT_POINTS[sportName] || 25;
};

// Tüm spor puanlarını getir
export const getAllSportPoints = () => {
  return SPORT_POINTS;
}; 