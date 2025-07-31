import { Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../../components/CustomButton/CustomButton";
import SelectButton from "../../../components/SelectButton/SelectButton";
import Beginner from "../../../assets/images/vector/Beginner.png";
import Intermediate from "../../../assets/images/vector/Intermediate.png";
import Advanced from "../../../assets/images/vector/Advanced.png";
import styles from "./SitUpCapacityScreen.style";
import { setSitUpCapacity } from "../../../redux/dataSlice";
import { useDispatch } from "react-redux";

const SitUpCapacityScreen = () => {
  const nav = useNavigation();

  const dispatch = useDispatch();

  const [selectedSitUpCapacity, setSelectedSitUpCapacity] = useState("");

  console.log("s",selectedSitUpCapacity);
  

  const handleSelect = (gender) => {
    setSelectedSitUpCapacity(gender);
  };

  const handleOnPress = () => {
    if (selectedSitUpCapacity !== "") {
      dispatch(setSitUpCapacity(selectedSitUpCapacity));
      nav.navigate("Motivation");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tek seferde kaç kez mekik çekebilirsin?</Text>
      <View style={styles.bodyContainer}>
        <SelectButton
          title={"Başlangıç seviyesi"}
          image={Beginner}
          selected={selectedSitUpCapacity === "Başlangıç seviyesi"}
          onSelect={() => handleSelect("Başlangıç seviyesi")}
          textDesc={"10-20 mekik"}
        />
        <SelectButton
          title={"Orta düzey"}
          image={Intermediate}
          selected={selectedSitUpCapacity === "Orta düzey"}
          onSelect={() => handleSelect("Orta düzey")}
          textDesc={"20-40 mekik"}
        />
        <SelectButton
          title={"Üst düzey"}
          image={Advanced}
          selected={selectedSitUpCapacity === "Üst düzey"}
          onSelect={() => handleSelect("Üst düzey")}
          textDesc={"40-60 mekik"}
        />
      </View>
      <View style={styles.btnbox}>
        <CustomButton
          onPress={handleOnPress}
          title={"Devam Et"}
          press={selectedSitUpCapacity}
        />
      </View>
    </View>
  );
};

export default SitUpCapacityScreen;
