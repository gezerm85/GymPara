import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { BarChart } from "react-native-gifted-charts";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { colors } from "../../utils/Colors/Color";

const SegmentedControl = () => {
  const [selectedOption, setSelectedOption] = useState("H");
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Her seçeneğin değişiminde grafiğin opaklığına animasyon ekle
    opacity.value = withTiming(1, {
      duration: 600,
      easing: Easing.out(Easing.exp),
    });
  }, [selectedOption]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  // Kalori verileri
  const calorieData = {
    G: [300, 600, 400, 800, 500, 700],
    H: [1400, 1200, 1500, 1300, 1800, 1700, 1600],
    A: [5000, 6200, 5900, 7200],
    "6A": [18000, 21000, 20000, 19000, 24000, 23000],
    Y: [
      120000, 135000, 130000, 140000, 155000, 150000, 160000, 145000, 170000,
      165000, 175000, 180000,
    ],
  };

  const options = ["G", "H", "A", "6A", "Y"];
  const screenWidth = Dimensions.get("window").width;

  const getData = () => {
    const labels = {
      G: ["06:00", "09:00", "12:00", "15:00", "18:00", "21:00"],
      H: ["Paz", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"],
      A: ["1. Hafta", "2. Hafta", "3. Hafta", "4. Hafta"],
      "6A": ["Oca", "Şub", "Mar", "Nis", "May", "Haz"],
      Y: [
        "Oca",
        "Şub",
        "Mar",
        "Nis",
        "May",
        "Haz",
        "Tem",
        "Ağu",
        "Eyl",
        "Eki",
        "Kas",
        "Ara",
      ],
    };

    return {
      data: calorieData[selectedOption].map((value, index) => ({
        value,
        label: labels[selectedOption][index],
        labelColor: "#A6A6A6",
        frontColor: colors.MainColor, // Mavi renk
      })),
    };
  };

  const totalCalories = calorieData[selectedOption].reduce(
    (acc, val) => acc + val,
    0
  );
  const totalLabel = {
    G: "Bugün",
    H: "Bu Hafta",
    A: "Bu Ay",
    "6A": "6 Aylık",
    Y: "Bu Yıl",
  }[selectedOption];

  return (
    <View style={styles.container}>
      {/* Segment Control */}
      <View style={styles.segmentContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              selectedOption === option && styles.selectedOption,
            ]}
            onPress={() => setSelectedOption(option)}
          >
            <Text
              style={[
                styles.optionText,
                selectedOption === option && styles.selectedText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>TOPLAM</Text>
        <Text style={styles.headerText}>{totalCalories}<Text style={styles.headerSpan}> kalori</Text></Text>
        <Text style={styles.subText}>{totalLabel}</Text>
      </View>

      {/* Toplam Kalori ve Grafik */}
      <Animated.View style={[styles.chartContainer, animatedStyle]}>
        <BarChart
          data={getData().data} // Grafikte gösterilecek veri
          width={screenWidth * 0.9}
          height={200}
          fromZero={true}
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisTextStyle={{ color: "#A6A6A6" }}
          noOfSections={4}
          barWidth={25}
          style={{ marginTop: 10, borderRadius: 16 }}
          barBorderTopLeftRadius={4}
          barBorderTopRightRadius={4}
          maxValue={2000}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  segmentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#7676801F",
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 5,
    width: "100%",
    marginTop: 12,
  },
  optionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    marginHorizontal: 5,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  selectedOption: {
    backgroundColor: "#ffffff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionText: {
    fontSize: 14,
    color: "#A6A6A6",
  },
  selectedText: {
    fontWeight: "600",
    color: "#000",
  },
  chartContainer: {
    width: "100%",
    alignItems: "center",
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 1,
  },
  headerText: {
    fontSize: 20,
    color: colors.textColor,
    fontFamily: 'Medium'
  },
  subText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#A6A6A6",
  },
  titleContainer:{
    marginVertical: 12,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%'
  },
  title:{
    fontFamily: 'Medium',
    color: '#8E8E93',
    fontSize: 14,
  },
  headerSpan:{
    color: '#8E8E93',
    fontSize: 14,
    fontFamily: 'Regular'
  },

});

export default SegmentedControl;
