import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { markWelcomeCompleted, clearError } from "../../../redux/userSlice";
import { navigationRef } from '../../../router/Navigation/navigationUtils';
import { CommonActions } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";
import Animated, { RotateInUpLeft } from "react-native-reanimated";
import loaded from "../../../assets/Lottie/completed.json";
import { colors } from "../../../utils/Colors/Color";
import CustomButton from "../../../components/CustomButton/CustomButton";

const PersonalizedPlanCompletionScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const [animationFinished, setAnimationFinished] = useState(false);

  // Hata mesajını göster
  useEffect(() => {
    if (error) {
      Alert.alert("Hata", error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleOnPress = async () => {
    try {
      await dispatch(markWelcomeCompleted());
      
      // Ana ekrana yönlendir
      if (navigationRef.isReady()) {
        navigationRef.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'MainBottomTabs' }
            ],
          })
        );
      }
    } catch (error) {
      console.error('Welcome completed hatası:', error);
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
