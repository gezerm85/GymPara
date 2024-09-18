import { StyleSheet, Text, View, Dimensions, SafeAreaView } from "react-native";
import React, { useState } from "react";
import loaded from "../../../assets/Lottie/completed.json";
import LottieView from "lottie-react-native";
import { colors } from "../../../utils/Colors/Color";
import CustomButton from "../../../components/CustomButton/CustomButton";
import Animated, { RotateInUpLeft } from "react-native-reanimated";
import { useDispatch } from "react-redux";
import { toggleAuth } from "../../../redux/mainSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

const PersonalizedPlanCompletionScreen = () => {
  const [animationFinished, setAnimationFinished] = useState(false);

  const { userData } = useSelector((state) => state.data);

  const dispatch = useDispatch();

  const handleOnPress = () => {
    AsyncStorage.setItem("userData", JSON.stringify(userData));
    dispatch(toggleAuth());
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Size özel planınız nerdeyse tamamlandı!</Text>
      <View>
        <LottieView
          source={loaded}
          style={styles.lottie}
          onAnimationFinish={() => setAnimationFinished(true)}
          loop={false}
          autoPlay
        />
      </View>
      {animationFinished && (
        <Animated.Text style={styles.completionText} entering={RotateInUpLeft}>
          Odaklan, kararlı ol pes etme! Hedeflerine ulaşmak için gereken güce
          sahipsin. İlerle ve başar!
        </Animated.Text>
      )}
      <View style={styles.btnbox}>
        <CustomButton title={"Antremana Başla!"} onPress={handleOnPress} />
      </View>
    </SafeAreaView>
  );
};

export default PersonalizedPlanCompletionScreen;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontFamily: "DMSansBold",
    lineHeight: 30.79,
    marginTop: 100,
    width: width * 0.7,
    textAlign: "center",
    color: colors.textColor,
  },
  lottie: {
    width: width * 0.675,
    height: height * 0.33,
  },
  completionText: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.textColor,
    fontFamily: "DMSans",
    lineHeight: 25.6,
    textAlign: "center",
    width: width * 0.9,
  },
  btnbox: {
    marginBottom: 62,
  },
});
