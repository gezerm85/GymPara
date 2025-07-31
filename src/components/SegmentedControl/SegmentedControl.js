import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { colors } from "../../utils/Colors/Color";

const { width: screenWidth } = Dimensions.get('window');

const SegmentedControl = ({ calorieData }) => {
  const [selectedOption, setSelectedOption] = useState("H");
  const opacity = useSharedValue(0);

 

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 600,
      easing: Easing.out(Easing.exp),
    });
  }, [selectedOption]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const dataToUse = calorieData;
  const options = ["G", "H", "A", "6A", "Y"];

  const getData = () => {
    // calorieData'dan seçili option'ın verisini al
    const selectedData = dataToUse?.[selectedOption];
    
    if (!selectedData || selectedData.length === 0) {
      return [];
    }

    // Gerçek tarih etiketleri ve tam saatler
    const getDateLabels = () => {
      const today = new Date();
      
      switch (selectedOption) {
        case "G": // Günlük - son 6 saat
          return ["06:00", "09:00", "12:00", "15:00", "18:00", "21:00"];
          
        case "H": // Haftalık - son 7 gün
          const weekLabels = [];
          for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dayNames = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];
            const dayName = dayNames[date.getDay()];
            const dayNumber = date.getDate();
            weekLabels.push(`${dayName} ${dayNumber}`);
          }
          return weekLabels;
          
        case "A": // Aylık - son 4 hafta
          return ["1. Hafta", "2. Hafta", "3. Hafta", "4. Hafta"];
          
        case "6A": // 6 Aylık - son 6 ay
          const monthLabels = [];
          for (let i = 5; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            const monthNames = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
            const monthName = monthNames[date.getMonth()];
            const year = date.getFullYear();
            monthLabels.push(`${monthName} ${year}`);
          }
          return monthLabels;
          
        case "Y": // Yıllık - son 12 ay
          const yearLabels = [];
          for (let i = 11; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            const monthNames = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
            const monthName = monthNames[date.getMonth()];
            const year = date.getFullYear();
            yearLabels.push(`${monthName} ${year}`);
          }
          return yearLabels;
          
        default:
          return selectedData.map((_, index) => `Gün ${index + 1}`);
      }
    };

    const labels = getDateLabels();
    
    // Veriyi label ve value olarak dönüştür
    return selectedData.map((value, index) => ({
      label: labels[index] || `Gün ${index + 1}`,
      value: value,
    }));
  };

  const totalCalories = dataToUse?.[selectedOption]?.reduce(
    (acc, val) => acc + val,
    0
  ) || 0;
  
  const totalLabel = {
    G: "Bugün",
    H: "Bu Hafta",
    A: "Bu Ay",
    "6A": "6 Aylık",
    Y: "Bu Yıl",
  }[selectedOption];

  const CustomBarChart = ({ data }) => {
    console.log("CustomBarChart data:", data);
    console.log("Selected option:", selectedOption);
    console.log("DataToUse:", dataToUse);
    
    if (!data || data.length === 0) {
      return (
        <View style={styles.customChartContainer}>
          <Text style={styles.noDataText}>Bu dönem için veri bulunamadı</Text>
        </View>
      );
    }

    const maxValue = Math.max(...data.map(item => item.value), 1);
    
    return (
      <View style={styles.customChartContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.barContainer}>
            <View style={styles.barWrapper}>
              <View 
                style={[
                  styles.bar, 
                  { 
                    height: (item.value / maxValue) * 120,
                    backgroundColor: colors.MainColor 
                  }
                ]} 
              />
            </View>
            <Text style={styles.barLabel}>{item.label}</Text>
            <Text style={styles.barValue}>{item.value}</Text>
          </View>
        ))}
      </View>
    );
  };

  if (!dataToUse || !dataToUse[selectedOption] || dataToUse[selectedOption].length === 0) {
    return (
      <View style={styles.container}>
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
        <View style={styles.chartContainer}>
          <Text style={styles.noDataText}>Veri bulunamadı</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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

      <Animated.View style={[styles.chartContainer, animatedStyle]}>
        <Text style={styles.headerText}>
          {totalLabel} Toplam: {totalCalories} Kalori
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10}}
        >
          <CustomBarChart data={getData()} />
        </ScrollView>
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
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 6,
    width: "100%",
  },
  optionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 3,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  selectedOption: {
    backgroundColor: "#ffffff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  optionText: {
    fontSize: 14,
    color: "#A6A6A6",
    fontFamily: 'Medium',
  },
  selectedText: {
    fontWeight: "600",
    color: "#000",
    fontFamily: 'SemiBold',
  },
  chartContainer: {
    width: "100%",
    alignItems: "center",
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    marginTop: 16,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 16,
    fontFamily: 'SemiBold',
  },
  customChartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 10,
  },
  barContainer: {
    alignItems: "center",
    marginHorizontal: 8,
    width: 60,
  },
  barWrapper: {
    height: 120,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bar: {
    width: 25,
    borderRadius: 4,
    minHeight: 4,
  },
  barLabel: {
    fontSize: 10,
    color: "#A6A6A6",
    marginTop: 8,
    textAlign: "center",
    fontFamily: 'Regular',
  },
  barValue: {
    fontSize: 12,
    color: "#000",
    fontFamily: 'SemiBold',
    marginTop: 4,
  },
  customChartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 10,
  },
  noDataText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    fontFamily: 'Medium',
  },
});

export default SegmentedControl;
