import { StyleSheet, Text, View, Dimensions, SafeAreaView } from "react-native";
import React, { useState } from "react";
import loaded from "../../../assets/Lottie/completed.json";
import LottieView from "lottie-react-native";
import { colors } from "../../../utils/Colors/Color";
import CustomButton from "../../../components/CustomButton/CustomButton";
import Animated, { RotateInUpLeft } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { setWelcomeCompleted } from '../../../redux/dataSlice';
import { navigationRef } from '../../../router/Navigation/navigationUtils';
import { markWelcomeCompleted } from '../../../services/apiAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PersonalizedPlanCompletionScreen = () => {
  const [animationFinished, setAnimationFinished] = useState(false);
  const { userData } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const navigation = useNavigation()

  // 🔹 **API'ye kullanıcı verisini gönder ve 'welcome_completed' işaretini güncelle**
  const handleOnPress = async () => {
    try {
      console.log('Welcome completed işaretleniyor...');
      
      // API'ye welcome_completed: true gönder
      const result = await markWelcomeCompleted();
      console.log('API yanıtı:', result);
      
      // Redux state'i güncelle
      dispatch(setWelcomeCompleted(true));
      
      // AsyncStorage'ı güncelle
      const currentUserData = await AsyncStorage.getItem('userData');
      if (currentUserData) {
        const updatedUserData = {
          ...JSON.parse(currentUserData),
          welcome_completed: true
        };
        await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
      }
      
      console.log("✅ Welcome completed başarıyla işaretlendi");
      
      // Navigation.js otomatik olarak ana ekrana yönlendirecek

    } catch (error) {
      console.error("Veri güncelleme hatası:", error);
    }
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
          Odaklan, kararlı ol pes etme! Hedeflerine ulaşmak için gereken güce sahipsin.
          İlerle ve başar!
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
    fontFamily: "Bold",
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
    color: colors.textColor,
    fontFamily: "Regular",
    lineHeight: 25.6,
    textAlign: "center",
    width: width * 0.9,
  },
  btnbox: {
    marginBottom: 62,
  },
});
