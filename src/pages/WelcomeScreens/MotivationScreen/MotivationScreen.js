import { Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../../components/CustomButton/CustomButton";
import SelectButton from "../../../components/SelectButton/SelectButton";
import wrestling from "../../../assets/images/vector/wrestling.png";
import Weights from "../../../assets/images/vector/Weights.png";
import Running from "../../../assets/images/vector/Running.png";
import styles from "./MotivationScreen.style";
import { useDispatch } from "react-redux";
import { setMotivation } from "../../../redux/dataSlice";

const MotivationScreen = () => {
  const nav = useNavigation();

  const [selectedMotivation, setSelectedMotivation] = useState("");

  const dispatch = useDispatch();

  const handleSelect = (gender) => {
    setSelectedMotivation(gender);
  };

  const handleOnPress = () => {
    if (selectedMotivation !== "") {
      dispatch(setMotivation(selectedMotivation));
      nav.navigate("WeightAndHeight");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seni ne motive eder?</Text>
      <View style={styles.bodyContainer}>
        <SelectButton
          title={"Eğlenceli spor arkadaşları"}
          image={wrestling}
          selected={selectedMotivation === "Eğlenceli spor arkadaşları"}
          onSelect={() => handleSelect("Eğlenceli spor arkadaşları")}
          textDesc={""}
        />
        <SelectButton
          title={"Gelişim ve başarı hissi"}
          image={Weights}
          selected={selectedMotivation === "Gelişim ve başarı hissi"}
          onSelect={() => handleSelect("Gelişim ve başarı hissi")}
          textDesc={""}
        />
        <SelectButton
          title={"Sağlık ve zindelik"}
          image={Running}
          selected={selectedMotivation === "Sağlık ve zindelik"}
          onSelect={() => handleSelect("Sağlık ve zindelik")}
          textDesc={""}
        />
      </View>
      <View style={styles.btnbox}>
        <CustomButton
          onPress={handleOnPress}
          title={"Devam Et"}
          press={selectedMotivation}
        />
      </View>
    </View>
  );
};

export default MotivationScreen;
