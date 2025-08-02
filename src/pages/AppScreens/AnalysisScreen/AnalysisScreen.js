import { StyleSheet, Text, View, Alert, ScrollView, Modal, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUserExercises } from "../../../redux/userExercisesSlice";
import SegmentedControl from "../../../components/SegmentedControl/SegmentedControl";
import ExerciseLogCard from "../../../components/ExerciseLogCard/ExerciseLogCard";
import CustomHeader from "../../../components/CustomHeader/CustomHeader";
import Icon from 'react-native-vector-icons/FontAwesome6';
import { calculateCalories } from "../../../utils/calorieCalculator";

const AnalysisScreen = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.data.userData.userInformation);
  const userExercises = useSelector((state) => state.userExercises.items);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(loadUserExercises());
  }, [dispatch]);

  // workautDays'i userData'dan al
  const workautDays = userData?.workautDays || [];

  console.log("------->",userData.weight);


  // Egzersiz kayıtlarını tarihe göre sırala (en yeni önce)
  const sortedExercises = [...userExercises].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  // Firebase'den gelen verileri kalori verilerine dönüştür
  const processCalorieData = () => {
    if (!userExercises || userExercises.length === 0) return null;

    // Günlük veriler (son 6 gün)
    const dailyData = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayExercises = userExercises.filter(exercise => {
        const exerciseDate = new Date(exercise.createdAt);
        return exerciseDate.toDateString() === date.toDateString();
      });
      const totalCalories = dayExercises.reduce((sum, exercise) => {
        return sum + calculateCalories(exercise.duration, exercise.unit, exercise.activityTitle, userData.weight);
      }, 0);
      dailyData.push(totalCalories);
    }

    // Haftalık veriler (son 7 gün)
    const weeklyData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayExercises = userExercises.filter(exercise => {
        const exerciseDate = new Date(exercise.createdAt);
        return exerciseDate.toDateString() === date.toDateString();
      });
      const totalCalories = dayExercises.reduce((sum, exercise) => {
        return sum + calculateCalories(exercise.duration, exercise.unit, exercise.activityTitle, userData.weight  );
      }, 0);
      weeklyData.push(totalCalories);
    }

    // Aylık veriler (son 4 hafta)
    const monthlyData = [];
    for (let i = 3; i >= 0; i--) {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - (weekStart.getDay() + 7 * i));
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      
      const weekExercises = userExercises.filter(exercise => {
        const exerciseDate = new Date(exercise.createdAt);
        return exerciseDate >= weekStart && exerciseDate <= weekEnd;
      });
      
      const totalCalories = weekExercises.reduce((sum, exercise) => {
        return sum + calculateCalories(exercise.duration, exercise.unit, exercise.activityTitle, userData.weight);
      }, 0);
      monthlyData.push(totalCalories);
    }

    // 6 aylık veriler (son 6 ay)
    const sixMonthData = [];
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date();
      monthStart.setMonth(monthStart.getMonth() - i);
      monthStart.setDate(1);
      const monthEnd = new Date(monthStart);
      monthEnd.setMonth(monthEnd.getMonth() + 1);
      monthEnd.setDate(0);
      
      const monthExercises = userExercises.filter(exercise => {
        const exerciseDate = new Date(exercise.createdAt);
        return exerciseDate >= monthStart && exerciseDate <= monthEnd;
      });
      
      const totalCalories = monthExercises.reduce((sum, exercise) => {
        return sum + calculateCalories(exercise.duration, exercise.unit, exercise.activityTitle, userData.weight);
      }, 0);
      sixMonthData.push(totalCalories);
    }

    // Yıllık veriler (son 12 ay)
    const yearlyData = [];
    for (let i = 11; i >= 0; i--) {
      const monthStart = new Date();
      monthStart.setMonth(monthStart.getMonth() - i);
      monthStart.setDate(1);
      const monthEnd = new Date(monthStart);
      monthEnd.setMonth(monthEnd.getMonth() + 1);
      monthEnd.setDate(0);
      
      const monthExercises = userExercises.filter(exercise => {
        const exerciseDate = new Date(exercise.createdAt);
        return exerciseDate >= monthStart && exerciseDate <= monthEnd;
      });
      
      const totalCalories = monthExercises.reduce((sum, exercise) => {
        return sum + calculateCalories(exercise.duration, exercise.unit, exercise.activityTitle, userData.weight);
      }, 0);
      yearlyData.push(totalCalories);
    }

    return {
      G: dailyData,
      H: weeklyData,
      A: monthlyData,
      "6A": sixMonthData,
      Y: yearlyData,
    };
  };

  const calorieData = processCalorieData();

  const handleEditExercise = (exercise) => {
    setSelectedExercise(exercise);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedExercise(null);
  };


  return (
    <View style={styles.container}>
      <CustomHeader title="Analizler" />
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >


        <View style={styles.bodyContainer}>
          <SegmentedControl calorieData={calorieData} />
        </View>
        
        <View style={styles.exercisesContainer}>
          {sortedExercises.length > 0 ? (
            sortedExercises.map((exercise) => (
              <ExerciseLogCard 
                key={exercise.id} 
                exercise={exercise} 
                onEdit={handleEditExercise} 
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Henüz egzersiz kaydınız bulunmuyor</Text>
              <Text style={styles.emptySubText}>İlk egzersizinizi kaydetmeye başlayın!</Text>
            </View>
          )}
        </View>
      </ScrollView>

    </View>
  );
};

export default AnalysisScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  bodyContainer: {
    flex: 3,
  },
  innerContainer: {
    flex: 1,
  },
  exercisesContainer: {
    paddingHorizontal: 0,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
    textAlign: "center",
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  summaryText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '100%',
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  modalBody: {
    padding: 20,
  },
  detailRow: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  tag: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  star: {
    marginRight: 2,
  },
});
