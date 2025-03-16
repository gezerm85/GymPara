import { TouchableOpacity, Vibration } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

import React from "react";
import { colors } from "../../../utils/Colors/Color";
import { useNavigation } from "@react-navigation/native";
import styles from "./LoginLeft.style";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginLeft = () => {
  const nav = useNavigation();

  const handleOnPress = async () => {
    Vibration.vibrate(25);
    await AsyncStorage.removeItem("isRememberMe")
    await AsyncStorage.removeItem("userData");
    await AsyncStorage.removeItem("rememberedEmail");
    await AsyncStorage.removeItem("rememberedPassword");
    nav.navigate('LoginScreen');
  };
  return (
    <TouchableOpacity onPress={handleOnPress} style={styles.container}>
      <AntDesign name="arrowleft" size={23} color={colors.MainColor} />
    </TouchableOpacity>
  );
};

export default LoginLeft;
