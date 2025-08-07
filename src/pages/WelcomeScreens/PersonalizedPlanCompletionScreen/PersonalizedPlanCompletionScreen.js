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
import { API_BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = API_BASE_URL || 'http://10.0.2.2:5000/api';

const PersonalizedPlanCompletionScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const { userData } = useSelector((state) => state.data);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hata mesajını göster
  useEffect(() => {
    if (error) {
      Alert.alert("Hata", error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // API'ye profil verilerini gönder
  const submitProfileData = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      
      if (!token) {
        throw new Error('Token bulunamadı');
      }

      // API'ye gönderilecek veri formatını hazırla
      const profileData = {
        gender: userData.gender,
        birth_year: userData.year,
        activity_level: userData.activityLevel,
        motivation: userData.motivation,
        weight: userData.weight,
        height: userData.height,
        workout_days: userData.workautDays
      };

      console.log('📤 API\'ye gönderilecek profil verisi:', profileData);

      // POST /api/profile
      const profileResponse = await fetch(`${API_URL}/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!profileResponse.ok) {
        const errorData = await profileResponse.json();
        throw new Error(errorData.message || 'Profil verisi gönderilemedi');
      }

      console.log('✅ Profil verisi başarıyla gönderildi');

      // PUT /api/profile/welcome
      const welcomeResponse = await fetch(`${API_URL}/profile/welcome`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ welcome_completed: true }),
      });

      if (!welcomeResponse.ok) {
        const errorData = await welcomeResponse.json();
        throw new Error(errorData.message || 'Welcome durumu güncellenemedi');
      }

      console.log('✅ Welcome durumu başarıyla güncellendi');

      // Redux'ta welcome_completed'i güncelle
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
      console.error('❌ Profil gönderme hatası:', error);
      Alert.alert("Hata", error.message || "Veriler gönderilirken bir sorun oluştu");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOnPress = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    await submitProfileData();
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
        <CustomButton 
          title={isSubmitting ? "Gönderiliyor..." : "Antremana Başla!"} 
          onPress={handleOnPress}
          disabled={isSubmitting}
        />
        {isSubmitting && (
          <ActivityIndicator 
            size="small" 
            color={colors.MainColor} 
            style={styles.loadingIndicator}
          />
        )}
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
    alignItems: 'center',
  },
  loadingIndicator: {
    marginTop: 10,
  },
});
