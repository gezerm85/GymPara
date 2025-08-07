import { StyleSheet, Text, View, Button, Modal, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CarouselComponent from "../../../components/CarouselComponent/CarouselComponent";
import CustomHeader from "../../../components/CustomHeader/CustomHeader";
import WeeklyGoal from "../../../components/CustomCalendar/WeeklyGoalComponent ";
import { loadUserExercises } from "../../../redux/userExercisesSlice";
import LeaderboardComponent from "../../../components/LeaderboardComponent/LeaderboardComponent";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.data.userData.userInformation);
  const userExercises = useSelector((state) => state.userExercises.items);
  const { profile } = useSelector((state) => state.user);

  // API'den gelen workout_days'i kullan, yoksa userData'dan al
  const workautDays = profile?.workout_days || userData?.workautDays || [];

  // completedDays: userExercises içindeki createdAt'ten haftanın günü
  const completedDays = userExercises
    .map((log) => {
      if (log.createdAt) {
        const date = new Date(log.createdAt);
        return date.getDate(); // Ayın günü
      }
      return null;
    })
    .filter(Boolean);

  return (
    <View style={styles.container}>
      <CustomHeader title="GYMPARA" />
      <View style={styles.weeklyGoalContainer}>
        <WeeklyGoal workautDays={workautDays} completedDays={completedDays} />
      </View>
      <View style={styles.bodyContainer}>
        <CarouselComponent />
      </View>
      <View style={styles.leaderboardContainer}>
        <LeaderboardComponent />
      </View>
      <View style={styles.adContainer}>
        <Text>Reklam cartları</Text>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    gap: 16,
    
  },
  weeklyGoalContainer: {
    paddingHorizontal: 16,
  },
  bodyContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  leaderboardContainer: {
    paddingHorizontal: 16,
    height: 100,
  },
  adContainer: {
    paddingHorizontal: 16,
  },
});

