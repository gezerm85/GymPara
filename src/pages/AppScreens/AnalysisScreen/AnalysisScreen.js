import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import WeeklyGoal from "../../../components/CustomCalendar/WeeklyGoalComponent ";
import CustomChart from "../../../components/CustomChart/CustomChart";
import SegmentedControl from "../../../components/SegmentedControl/SegmentedControl";

const AnalysisScreen = () => {
  const today = new Date().getDate();

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
        <SegmentedControl />
      </View>
      <View style={styles.bottomContainer}>
        <Text>afsafasf</Text>
      </View>
    </View>
  );
};

export default AnalysisScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  bodyContainer: {
    flex: 6,
  },
  innerContainer: {
    flex: 2,
  },
  bottomContainer:{
    flex: 3,
  }
});
