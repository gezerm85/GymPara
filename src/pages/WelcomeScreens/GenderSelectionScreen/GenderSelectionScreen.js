import { Text, View } from "react-native";
import React, { useState } from "react";
import SelectButton from "../../../components/SelectButton/SelectButton";
import woman from "../../../assets/images/vector/woman.png";
import male from "../../../assets/images/vector/male.png";
import other from "../../../assets/images/vector/other.png";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import styles from "./GenderSelectionScreen.style";
import { useDispatch, useSelector } from "react-redux";
import { setGender } from "../../../redux/dataSlice";

const GenderSelectionScreen = () => {
  const nav = useNavigation(); 

  const [selectedGender, setSelectedGender] = useState("");

  const dispatch = useDispatch();

  const handleSelect = (gender) => {
    setSelectedGender(gender);
  };
  const handleOnPress = () => {
    if (selectedGender !== "") {
      dispatch(setGender(selectedGender));
      nav.navigate("YearSelector");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cinsiyetiniz nedir?</Text>
      <View style={styles.bodyContainer}>
        <SelectButton
          title={"Kadın"}
          image={woman}
          selected={selectedGender === "Kadın"}
          onSelect={() => handleSelect("Kadın")}
          textDesc={""}
        />
        <SelectButton
          title={"Erkek"}
          image={male}
          selected={selectedGender === "Erkek"}
          onSelect={() => handleSelect("Erkek")}
          textDesc={""}
        />
        <SelectButton
          title={"Diğer"}
          image={other}
          selected={selectedGender === "Diğer"}
          onSelect={() => handleSelect("Diğer")}
          textDesc={""}
        />
      </View>
      <View style={styles.buttonBox}>
        <CustomButton
          onPress={handleOnPress}
          title={"Devam Et"}
          press={selectedGender}
        />
      </View>
    </View>
  );
};

export default GenderSelectionScreen;
