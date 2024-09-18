import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, Vibration } from "react-native";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import styles from "./YearSelectorScreen.style";
import { useDispatch } from "react-redux";
import { setYear } from "../../../redux/dataSlice";

const YearSelectorScreen = () => {
  const nav = useNavigation();

  const [selectedYear, setSelectedYear] = useState(1999);

  const dispatch = useDispatch();

  const handleOnPress = () => {
    dispatch(setYear(selectedYear));
    nav.navigate("GoalSelection");
  };

  const scrollViewRef = useRef();
  const years = Array.from({ length: 50 }, (_, k) => 1975 + k);

  useEffect(() => {
    const index = years.indexOf(selectedYear);
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          y: index * 50,
          animated: false,
        });
      }
    }, 100);
  }, [selectedYear]);

  const handleScrollEnd = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.y / 50);
    const year = years[index];
    setSelectedYear(year);

    handleMomentumScrollEnd();
  };

  const handleMomentumScrollEnd = () => {
    if (scrollViewRef.current) {
      const index = years.indexOf(selectedYear);
      scrollViewRef.current.scrollTo({
        y: index * 50,
        animated: false,
      });
      Vibration.vibrate(25);
    }
  };

  const calculateOpacity = (year) => {
    const distance = Math.abs(
      years.indexOf(year) - years.indexOf(selectedYear)
    );
    return distance === 0 ? 1 : 1 - Math.min(distance / 5, 0.9);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doğum yılınızı giriniz</Text>
      <View style={styles.bodyContainer}>
        <View style={styles.selectedIndicator} />
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          onScrollEndDrag={handleScrollEnd}
          decelerationRate="normal"
          contentContainerStyle={styles.scrollContainer}
        >
          {years.map((year, index) => (
            <View key={index} style={styles.yearItem}>
              <Text
                style={[
                  styles.text,
                  selectedYear === year && styles.selectedText,
                  { opacity: calculateOpacity(year) },
                ]}
              >
                {year}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.btnBox}>
        <CustomButton title={"Devam Et"} onPress={handleOnPress} />
      </View>
    </View>
  );
};

export default YearSelectorScreen;
