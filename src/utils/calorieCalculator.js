// Kalori hesaplama fonksiyonu
export const calculateCalories = (duration, unit, activityTitle) => {
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
  };

  // Ortalama kişi ağırlığı (kg) - gerçek uygulamada kullanıcının ağırlığı kullanılır
  const averageWeight = 70; // kg
  
  // MET değerini al (varsayılan: 5.0)
  const met = metValues[activityTitle] || 5.0;
  
  // Süreyi dakikaya çevir
  const durationInMinutes = unit === "saat" ? duration * 60 : duration;
  
  // Kalori hesaplama: Kalori = MET × Ağırlık (kg) × Süre (saat)
  const durationInHours = durationInMinutes / 60;
  const calories = Math.round(met * averageWeight * durationInHours);
  
  return calories;
}; 