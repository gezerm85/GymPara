import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../../utils/Colors/Color";
import { useSelector } from "react-redux";

const WeeklyGoal = ({
  completedDays = [],
}) => {
  const today = new Date();
  const currentDay = today.getDay();

  const { workautDays } = useSelector((state) => state.data.userData);

  const Days = workautDays.length;

  const completed = completedDays.length;

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
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Haftalık Hedef</Text>
        <Text style={styles.goal}>
          {completed}
          <Text style={styles.goal2}>/{Days}</Text>
        </Text>
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
    elevation: 5,
    width: "100%",
    height: "100%",
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
});

export default WeeklyGoal;
