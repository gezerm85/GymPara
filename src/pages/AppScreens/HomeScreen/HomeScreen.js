import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import CarouselComponent from "../../../components/CarouselComponent/CarouselComponent";
import CustomHeader from "../../../components/CustomHeader/CustomHeader";
import WeeklyGoal from "../../../components/CustomCalendar/WeeklyGoalComponent";
import { loadUserExercises } from "../../../redux/userExercisesSlice";
import LeaderboardComponent from "../../../components/LeaderboardComponent/LeaderboardComponent";
import BonusStrip from "../../../components/BonusStrip/BonusStrip";

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.data.userData.userInformation);
  const userExercises = useSelector((state) => state.userExercises.items);
  const { profile } = useSelector((state) => state.user);

  // Navigation'ı route params'dan al
  const nav = navigation || route?.params?.navigation;

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
        <LeaderboardComponent navigation={nav} />
      </View>
      <View style={styles.adContainer}>
        <BonusStrip
          items={[
            {
              id: "weekly",
              title1: "Haftalık",
              title2: "Bonus",
              reward: "+1",
              imageSource: require("../../../assets/images/bonus3.png"),
            },
            {
              id: "daily",
              title1: "Günlük",
              title2: "Bonus",
              reward: "+1",
              imageSource: require("../../../assets/images/bonus2.png"),
            },
            {
              id: "hourly",
              title1: "Saatlik",
              title2: "Bonus",
              reward: "+1",
              imageSource: require("../../../assets/images/bonus3.png"),
            },
          ]}
        />
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
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  leaderboardContainer: {
    paddingHorizontal: 16,
  },
  adContainer: {
    paddingHorizontal: 16,
  },
});
