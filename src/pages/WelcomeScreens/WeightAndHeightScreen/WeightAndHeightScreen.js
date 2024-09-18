import { Text, View } from "react-native";
import React from "react";
import WeightHeightCard from "../../../components/Cards/WeightHeightCard/WeightHeightCard";
import CustomButton from "../../../components/CustomButton/CustomButton";
import MeasureHeightCard from "../../../components/Cards/MeasureHeightCard/MeasureHeightCard";
import { useNavigation } from "@react-navigation/native";
import styles from "./WeightAndHeightScreen.style";

const WeightAndHeightScreen = () => {
  const nav = useNavigation();

  const handleButtonPress = () => {
    nav.navigate("WorkoutDaysSelection");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seni daha yakından tanıyalım</Text>
      <View>
        <WeightHeightCard
          title={"Ağırlık"}
          weightText={"Kg"}
          minValue={50}
          maxValue={250}
          initialWeight={70}
        />
        <MeasureHeightCard
          title={"Boy"}
          weightText={"CM"}
          initialWeight={185}
          minValue={90}
          maxValue={250}
        />
      </View>
      <View style={styles.btnBox}>
        <CustomButton title={"Devam Et"} onPress={handleButtonPress} />
      </View>
    </View>
  );
};

export default WeightAndHeightScreen;
