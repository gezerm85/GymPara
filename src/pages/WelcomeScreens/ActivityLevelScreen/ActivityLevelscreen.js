import { Text, View } from "react-native";
import React, { useState } from "react";
import SelectButton from "../../../components/SelectButton/SelectButton";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import Inactive from "../../../assets/images/vector/Inactive.png";
import PartiallyActive from "../../../assets/images/vector/PartiallyActive.png";
import VeryActive from "../../../assets/images/vector/VeryActive.png";
import styles from "./ActivityLevelscreen.style";
import { setActivityLevel } from "../../../redux/dataSlice";
import { useDispatch } from "react-redux";

const ActivityLevelscreen = () => {
  const nav = useNavigation();
  const dispatch = useDispatch();

  const [selectedActivity, setSelectedActivity] = useState("");

  const handleSelect = (gender) => {
    setSelectedActivity(gender);
  };

  const handleOnPress = () => {
    if (selectedActivity !== "") {
      dispatch(setActivityLevel(selectedActivity));
      nav.navigate("SitUpCapacity");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aktivite düzeyiniz nedir?</Text>
      <View style={styles.bodyContainer}>
        <SelectButton
          title={"Hareketsiz"}
          image={Inactive}
          selected={selectedActivity === "Hareketsiz"}
          onSelect={() => handleSelect("Hareketsiz")}
          textDesc={""}
        />
        <SelectButton
          title={"Kısmen aktif"}
          image={PartiallyActive}
          selected={selectedActivity === "Kısmen aktif"}
          onSelect={() => handleSelect("Kısmen aktif")}
          textDesc={""}
        />
        <SelectButton
          title={"Çok aktif"}
          image={VeryActive}
          selected={selectedActivity === "Çok aktif"}
          onSelect={() => handleSelect("Çok aktif")}
          textDesc={""}
        />
      </View>
      <View style={styles.btnbox}>
        <CustomButton
          onPress={handleOnPress}
          title={"Devam Et"}
          press={selectedActivity}
        />
      </View>
    </View>
  );
};

export default ActivityLevelscreen;
