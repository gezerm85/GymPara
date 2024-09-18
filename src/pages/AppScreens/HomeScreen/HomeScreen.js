import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect } from "react";
import TopTabs from "../../../router/TopTab/TopTab";
import WeeklyGoal from "../../../components/CustomCalendar/WeeklyGoalComponent ";
import { useSelector, useDispatch } from "react-redux";
import { loadUserData } from "../../../redux/dataSlice";

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserData())
      .unwrap()
      .then((data) => {
        if (data) {
        }
      })
      .catch((error) => {});
  }, [dispatch]);

  const today = new Date().getDate();

  const days = new Date().getDate();

  const [completedDays, setCompletedDays] = useState([]);


  

  const handleCompleteToday = () => {
    if (!completedDays.includes(today)) {
      setCompletedDays([...completedDays, today]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <WeeklyGoal completedDays={completedDays} />
      </View>
      <View style={styles.bodyContainer}>
        <TopTabs />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bodyContainer: {
    flex: 5,
    marginBottom: 16
  },
  innerContainer: {
    flex: 1,
    margin: 16,
  },
});
