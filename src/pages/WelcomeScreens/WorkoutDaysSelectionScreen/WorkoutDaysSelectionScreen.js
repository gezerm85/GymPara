import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import WeeklyRoutineSelector from "../../../components/WeeklyRoutineSelector/WeeklyRoutineSelector";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import styles from "./WorkoutDaysSelectionScreen.style";
import { useSelector, useDispatch } from "react-redux";
import { setWorkautDays } from "../../../redux/dataSlice";

const WorkoutDaysSelectionScreen = () => {
  const [selectedDays, setSelectedDays] = useState([]);

  const isPressValid = selectedDays.length;

  const handlePrintSelectedDays = () => {
    if (selectedDays.length !== 0) {
      dispatch(setWorkautDays(selectedDays));
      nav.navigate("PersonalizedPlanCompletion");
    }
  };

  const nav = useNavigation();

  const dispatch = useDispatch();

  const value = useSelector((value) => value.data.userData.workautDays);

  const handleDaySelect = (day) => {
    setSelectedDays((prevDays) => {
      if (prevDays.includes(day)) {
        return prevDays.filter((d) => d !== day);
      } else {
        return [...prevDays, day];
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Haftalık antreman günlerini seç</Text>
      <View style={styles.bodyContainer}>
        <WeeklyRoutineSelector title={"Pazartesi"} onSelect={handleDaySelect} />
        <WeeklyRoutineSelector title={"Salı"} onSelect={handleDaySelect} />
        <WeeklyRoutineSelector title={"Çarşamba"} onSelect={handleDaySelect} />
        <WeeklyRoutineSelector title={"Perşembe"} onSelect={handleDaySelect} />
        <WeeklyRoutineSelector title={"Cuma"} onSelect={handleDaySelect} />
        <WeeklyRoutineSelector title={"Cumartesi"} onSelect={handleDaySelect} />
        <WeeklyRoutineSelector title={"Pazar"} onSelect={handleDaySelect} />
      </View>
      <View style={styles.btnBox}>
        <CustomButton
          title={"Bitir"}
          onPress={handlePrintSelectedDays}
          press={isPressValid}
        />
      </View>
    </View>
  );
};

export default WorkoutDaysSelectionScreen;
