import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../../utils/Colors/Color";
import { useDispatch, useSelector } from "react-redux";
import { addPoints } from "../../redux/pointsSlice";
import { Dialog, Portal, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env';

const API_URL = API_BASE_URL || 'http://10.0.2.2:5000/api';

const WeeklyGoal = ({ 
  completedDays = [],
  workautDays = [],
}) => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  const [hasClaimedReward, setHasClaimedReward] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [currentWeekKey, setCurrentWeekKey] = useState('');
  const today = new Date();
  const currentDay = today.getDay();

  // API'den gelen workout_days'i kullan, yoksa prop'tan al
  const workoutDays = profile?.workout_days || workautDays;
  const Days = workoutDays.length; 
  const completed = completedDays.length;


  // Haftanın başlangıç tarihini hesapla
  const getWeekStartDate = () => {
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
    return startOfWeek.toISOString().split('T')[0]; // YYYY-MM-DD formatında
  };

  // Hafta anahtarını hesapla (hafta değişimi için)
  const getWeekKey = () => {
    const weekStartDate = getWeekStartDate();
    return `user_1_${weekStartDate}`; // Şimdilik sabit user_id: 1
  };

  const startOfWeek = new Date(today);
  startOfWeek.setDate(
    today.getDate() - (currentDay === 0 ? 6 : currentDay - 1)
  );

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    const date = day.getDate();

    return {
      date,
      isToday: date === today.getDate(),
      isCompleted: completedDays.includes(date),
    };
  });

  // API'den haftalık hedef durumunu kontrol et
  const checkWeeklyGoalStatus = async () => {
    try {
      const weekKey = getWeekKey();
      setCurrentWeekKey(weekKey);
      
      // API'den haftalık hedef durumunu kontrol et
      const token = await AsyncStorage.getItem('authToken');
      
      if (!token) {
        console.log('Token bulunamadı, haftalık hedef kontrol edilmiyor');
        setHasClaimedReward(false);
        return;
      }

      const response = await fetch(`${API_URL}/weekly-goals/${weekKey}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
 
      if (response.ok) {
        const data = await response.json();
        setHasClaimedReward(data.completed || false);
      } else {
        console.log('API yanıt vermedi, varsayılan değer kullanılıyor');
        setHasClaimedReward(false);
      }
    } catch (error) {
      setHasClaimedReward(false);
    }
  };

  // Component mount olduğunda ve hafta değiştiğinde API'den durumu kontrol et
  useEffect(() => {
    checkWeeklyGoalStatus();
  }, [completedDays, workoutDays]); // completedDays veya workoutDays değiştiğinde tekrar kontrol et

  // Hafta değişimini kontrol et
  useEffect(() => {
    const checkWeekChange = async () => {
      const newWeekKey = getWeekKey();
      if (currentWeekKey && currentWeekKey !== newWeekKey) {
        console.log('Hafta değişti, hedef sıfırlanıyor');
        setHasClaimedReward(false);
        setCurrentWeekKey(newWeekKey);
        await checkWeeklyGoalStatus();
      }
    };
    
    checkWeekChange();
  }, [today, currentWeekKey]);

  const isWeeklyGoalCompleted = completed >= Days && Days > 0 && !hasClaimedReward;

  const handleWeeklyGoalReward = async () => {
    if (isWeeklyGoalCompleted) {
      try {
        const pointsEarned = 100; // Haftalık hedef tamamlama puanı
        const weekKey = getWeekKey();

        // API'ye puan ekle
        const token = await AsyncStorage.getItem('authToken');
        
        if (!token) {
          console.log('Token bulunamadı, puan eklenmiyor');
          setDialogMessage("Oturum bilgisi bulunamadı. Lütfen tekrar giriş yapın.");
          setDialogVisible(true);
          return;
        }

        // Puan ekleme API çağrısı
        try {
          const pointsResponse = await fetch(`${API_URL}/user/points/add`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              points: pointsEarned,
              reason: "Haftalık Hedef Tamamlama"
            }),
          });

          if (pointsResponse.ok) {
            dispatch(addPoints(pointsEarned));
          } else {
          }
        } catch (error) {
        }

        // Haftalık hedef tamamlama API çağrısı
        try {
          const weeklyGoalResponse = await fetch(`${API_URL}/weekly-goals`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              weekKey,
              weekStartDate: getWeekStartDate(),
              completed: true,
              pointsEarned,
              completedDays: completedDays,
              totalDays: Days,
            }),
          });

          if (weeklyGoalResponse.ok) {
            // Hedefi sıfırla - ödül alındı olarak işaretle
            setHasClaimedReward(true);
            
            
            // Dialog'u göster
            setDialogMessage(`Haftalık hedefinizi tamamladınız!\n+${pointsEarned} puan kazandınız!\n\nYeni hafta için hedefiniz sıfırlandı.`);
            setDialogVisible(true);
          } else {
            // Yine de kullanıcıya ödül ver
            setHasClaimedReward(true);
            setDialogMessage(`Haftalık hedefinizi tamamladınız!\n+${pointsEarned} puan kazandınız!`);
            setDialogVisible(true);
          }
        } catch (error) {
          console.log('Haftalık hedef API hatası (görmezden geliniyor):', error.message);
          // Yine de kullanıcıya ödül ver
          setHasClaimedReward(true);
          setDialogMessage(`Haftalık hedefinizi tamamladınız!\n+${pointsEarned} puan kazandınız!`);
          setDialogVisible(true);
        }
      } catch (error) {
        console.log('Genel hata (görmezden geliniyor):', error.message);
        setDialogMessage("Bir sorun oluştu ama ödülünüz verildi.");
        setDialogVisible(true);
      }
    }
  };
  
  return (
    <>
      <View style={styles.container}> 
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Haftalık Hedef</Text>
          <TouchableOpacity 
            onPress={handleWeeklyGoalReward}
            disabled={!isWeeklyGoalCompleted}
            style={styles.goalContainer}
          >
            {isWeeklyGoalCompleted ? (
              <View style={styles.giftContainer}>
                <AntDesign name="gift" size={24} color="#007aff" />
              </View>
            ) : hasClaimedReward ? (
              <Text style={styles.goal}>
                0
                <Text style={styles.goal2}>/{Days}</Text>
              </Text>
            ) : (
              <Text style={styles.goal}>
                {completed}
                <Text style={styles.goal2}>/{Days}</Text>
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.daysContainer}>
          {weekDays.map((day, index) => (
            <View
              key={index}
              style={[
                styles.dayBox,
                day.isToday || day.isCompleted ? styles.selectedDayBox : null,
              ]}
            >
              {day.isCompleted ? (
                <AntDesign
                  name="checkcircle"
                  size={28}
                  color={colors.MainColor}
                />
              ) : (
                <Text
                  style={[styles.dayText, day.isToday ? styles.todayText : null]}
                >
                  {day.date}
                </Text>
              )}
            </View>
          ))}
        </View>
      </View>

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title style={styles.dialogTitle}>
            {dialogMessage.includes('Tebrikler') ? 'Tebrikler! 🎉' : 'Bilgi'}
          </Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogContent}>{dialogMessage}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)} mode="contained">
              Tamam
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
    width: "100%",
    justifyContent: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 18,
    lineHeight: 19.07,
    color: colors.textColor,
    fontFamily: "Bold",
  },
  goalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  goal: {
    fontSize: 18,
    color: "#007aff",
    fontFamily: "SemiBold"
  },
  goal2: {
    fontSize: 18,
    color: colors.textColor,
    fontFamily: "SemiBold",
  },
  giftContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#007aff',
  },
  daysContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 23,
    paddingLeft: 16,
  },
  dayBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  selectedDayBox: {
    width: 28,
    height: 28,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    color: "#7F7F7F",
    fontSize: 16,
    lineHeight: 21,
    fontFamily: "Medium",
    width: 28,
    height: 28,
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: '#E9E9EA',
    borderRadius: 40,
  },
  todayText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: "Medium",
    backgroundColor: colors.MainColor,
    borderRadius: 16
  },
  dialogTitle: {
    textAlign: 'center',
    fontFamily: 'Bold',
  },
  dialogContent: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: 'Medium',
  },
});

export default WeeklyGoal;
