import { StyleSheet, Text, View } from "react-native";
import React,{useState} from "react";
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
        <SegmentedControl/>
      </View>
    </View>
  );
};

export default AnalysisScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bodyContainer: {
    flex: 5,
    paddingHorizontal: 16,
  },
  innerContainer: {
    flex: 1,
    margin: 16,
  },
});
