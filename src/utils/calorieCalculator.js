// Kalori hesaplama fonksiyonu (kişiselleştirilmiş ağırlık ile)
export const calculateCalories = (duration, unit, activityTitle, weight = 70) => {
  // Weight'i number'a çevir
  const weightNum = parseFloat(weight) || 70;
  
  // MET (Metabolic Equivalent of Task) değerleri
  const metValues = {
    "Futbol": 8.0,
    "Koşu": 9.8,
    "Yürüyüş": 3.5,
    "Bisiklet": 6.0,
    "Yüzme": 8.0,
    "Basketbol": 8.0,
    "Tenis": 7.0,
    "Voleybol": 4.0,
    "Evde Fitness": 4.5,
    "Pilates": 3.0,
    "Yoga": 2.5,
    "Ağırlık Kaldırma": 6.0,
    "Kardiyo": 8.0,
    "HIIT": 10.0,
    "Dans": 5.0,
    "Mountain Climbing": 8.0,
    "Rowing": 6.0,
    "Elliptical": 5.5,
    // Backend'den gelen yeni egzersiz türleri
    "futbol": 8.0,
    "koşu": 9.8,
    "yürüyüş": 3.5,
    "bisiklet": 6.0,
    "yüzme": 8.0,
    "basketbol": 8.0,
    "tenis": 7.0,
    "voleybol": 4.0,
    "evde fitness": 4.5,
    "pilates": 3.0,
    "yoga": 2.5,
    "ağırlık kaldırma": 6.0,
    "kardiyo": 8.0,
    "hiit": 10.0,
    "dans": 5.0,
    "mountain climbing": 8.0,
    "rowing": 6.0,
    "elliptical": 5.5,
  };

  // MET değerini al (varsayılan: 5.0)
  const met = metValues[activityTitle] || 5.0;

  // Süreyi dakikaya çevir
  const durationInMinutes = unit === "saat" ? duration * 60 : duration;

  // Kalori hesaplama: Kalori = MET × Ağırlık (kg) × Süre (saat)
  const durationInHours = durationInMinutes / 60;
  const calories = Math.round(met * weightNum * durationInHours);



  return calories;
};
