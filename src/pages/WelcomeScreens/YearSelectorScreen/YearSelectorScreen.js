import React, { useState, useRef, useEffect, useMemo } from "react";
import { View, Text, ScrollView, Vibration } from "react-native";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import styles from "./YearSelectorScreen.style";
import { useDispatch } from "react-redux";
import { setYear } from "../../../redux/dataSlice";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../utils/Colors/Color";

const ITEM_HEIGHT = 50;

const YearSelectorScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [selectedYear, setSelectedYear] = useState(1999);
  const scrollViewRef = useRef(null);

  const years = useMemo(() => Array.from({ length: 50 }, (_, i) => 1975 + i), []);

  // Başlangıçta seçili yılın konumuna scroll etmek için
  useEffect(() => {
    const index = years.indexOf(selectedYear);
    const timer = setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: index * ITEM_HEIGHT, animated: false });
    }, 100);
    return () => clearTimeout(timer);
  }, [selectedYear, years]);

  // Scroll tamamlandığında snap etkisi için ortak fonksiyon
  const snapToYear = (offsetY) => {
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const year = years[index];
    setSelectedYear(year);
    scrollViewRef.current?.scrollTo({ y: index * ITEM_HEIGHT, animated: false });
    Vibration.vibrate(25);
  };

  const handleScrollEnd = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    snapToYear(offsetY);
  };

  const handlePressContinue = () => {
    dispatch(setYear(selectedYear));
    navigation.navigate("GoalSelection");
  };

  const calculateOpacity = (index) => {
    const selectedIndex = years.indexOf(selectedYear);
    const distance = Math.abs(index - selectedIndex);
    return 1 - Math.min(distance / 5, 0.9);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doğum yılınızı giriniz</Text>
      <View style={styles.bodyContainer}>
        <View style={styles.selectedIndicator} />
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={handleScrollEnd}
          onScrollEndDrag={handleScrollEnd}
          decelerationRate="normal"
          contentContainerStyle={styles.scrollContainer}
        >
          {years.map((year, index) => (
            <View key={year} style={styles.yearItem}>
              {selectedYear === year ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Sol ok - Ionicons */}
                  <Ionicons name="chevron-forward" size={36} color={colors.MainColor} style={{ marginRight: 12, fontWeight: 'bold' }} />
                  <Text style={[styles.text, styles.selectedText]}>{year}</Text>
                  {/* Sağ ok - Ionicons */}
                  <Ionicons name="chevron-back" size={36} color={colors.MainColor} style={{ marginLeft: 12, fontWeight: 'bold' }} />
                </View>
              ) : (
                <Text
                  style={[
                    styles.text,
                    selectedYear === year && styles.selectedText,
                    { opacity: calculateOpacity(index) },
                  ]}
                >
                  {year}
                </Text>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.btnBox}>
        <CustomButton title="Devam Et" onPress={handlePressContinue} />
      </View>
    </View>
  );
};

export default YearSelectorScreen;
