import { Text, View } from "react-native";
import React, { useState } from "react";
import SelectButton from "../../../components/SelectButton/SelectButton";
import barbell from "../../../assets/images/vector/barbell.png";
import eyebrow from "../../../assets/images/vector/eyebrow.png";
import time from "../../../assets/images/vector/time.png";
import run from "../../../assets/images/vector/run.png";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import styles from "./GoalSelectionScreen.style";
import { useDispatch } from "react-redux";
import { setGoalSelection } from "../../../redux/dataSlice";

const GoalSelectionScreen = () => {
  const nav = useNavigation();

  const [selectedGoel, setSelectedGoel] = useState("");

  const dispatch = useDispatch();

  const handleOnPress = () => {
    if (selectedGoel !== "") {
      dispatch(setGoalSelection(selectedGoel));
      nav.navigate("ActivityLevel");
    }
  };

  const handleSelect = (gender) => {
    setSelectedGoel(gender);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hedefiniz nedir?</Text>
      <View style={styles.bodyContainer}>
        <SelectButton
          title={"Kilo Vermek"}
          image={time}
          selected={selectedGoel === "Kilo Vermek"}
          onSelect={() => handleSelect("Kilo Vermek")}
          textDesc={""}
        />
        <SelectButton
          title={"Fit kalmak"}
          image={run}
          selected={selectedGoel === "Fit kalmak"}
          onSelect={() => handleSelect("Fit kalmak")}
          textDesc={""}
        />
        <SelectButton
          title={"Kas yapmak"}
          image={eyebrow}
          selected={selectedGoel === "Kas yapmak"}
          onSelect={() => handleSelect("Kas yapmak")}
          textDesc={""}
        />
        <SelectButton
          title={"Kas kütlesi kazanmak"}
          image={barbell}
          selected={selectedGoel === "Kas kütlesi kazanmak"}
          onSelect={() => handleSelect("Kas kütlesi kazanmak")}
          textDesc={""}
        />
      </View>
      <View style={styles.btnbox}>
        <CustomButton
          onPress={handleOnPress}
          title={"Devam Et"}
          press={selectedGoel}
        />
      </View>
    </View>
  );
};

export default GoalSelectionScreen;
