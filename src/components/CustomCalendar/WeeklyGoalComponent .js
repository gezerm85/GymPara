import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../../utils/Colors/Color";
import { useSelector } from "react-redux";

const WeeklyGoal = ({
  goalsCompleted = 1,
  totalGoals = 3,
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
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 19.07,
    color: colors.textColor,
    fontFamily: "DMSans",
  },
  goal: {
    fontSize: 16,
    color: "#007aff",
    fontWeight: "600",
    fontFamily: "DMSans",
  },
  goal2: {
    fontSize: 12,
    color: colors.textColor,
    fontWeight: "600",
    fontFamily: "DMSans",
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
    color: "#7f7f7f",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 21,
    fontFamily: "DMSans",
    width: 28,
    height: 28,
    textAlign: "center",
    textAlignVertical: "center",
  },
  todayText: {
    color: colors.MainColor,
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "DMSans",
    fontWeight: "500",
  },
});

export default WeeklyGoal;
