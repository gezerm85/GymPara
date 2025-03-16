import React, { useEffect, useState } from "react";
import {
  NavigationContainer,
  CommonActions,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WelcomeStack from "../WelcomeStack/WelcomeStack";
import MainBottomTabs from "../MainBottomTabs/MainBottomTabs";
import { useDispatch } from "react-redux";
import { loadUserData } from "../../redux/dataSlice";
import { signIn } from "../../firebase/firebaseAuth"; // Firebase Auth için
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen"; // Yüklenme ekranı
import TopTabsNavigator from "../TopTabsNavigator/TopTabsNavigator";

const RootStack = createNativeStackNavigator();
export const navigationRef = createNavigationContainerRef();

const Navigation = () => {
  const dispatch = useDispatch();
  const [isCheckingLogin, setIsCheckingLogin] = useState(true); // Otomatik giriş kontrolü

  // 🔹 Beni Hatırla Kontrolü: Kullanıcıyı oturum açtır ve yönlendir
  useEffect(() => {
    const checkAutoLogin = async () => {
      try {
        const savedRememberMe = await AsyncStorage.getItem("isRememberMe");
        const savedEmail = await AsyncStorage.getItem("rememberedEmail");
        const savedPassword = await AsyncStorage.getItem("rememberedPassword");

        if (savedRememberMe === "true" && savedEmail && savedPassword) {
          console.log("✅ Beni Hatırla aktif, otomatik giriş yapılıyor...");
          await signIn(savedEmail, savedPassword); // Firebase ile oturum aç
          await dispatch(loadUserData()); // Kullanıcı verisini Redux'a yükle

          // Navigation hazır olduğunda yönlendir
          const redirectToHome = () => {
            if (navigationRef.isReady()) {
              console.log("🚀 Navigasyon hazır, Home sayfasına yönlendiriliyor...");
              navigationRef.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "MainBottomTabs", params: { screen: "Home" } }],
                })
              );
            } else {
              console.warn("⏳ Navigation henüz hazır değil, tekrar denenecek...");
              setTimeout(redirectToHome, 100); // 100ms sonra tekrar dene
            }
          };

          redirectToHome();
        }
      } catch (error) {
        console.error("🚨 Otomatik giriş hatası:", error);
      } finally {
        setIsCheckingLogin(false); // Kontrol tamamlandı
      }
    };

    checkAutoLogin();
  }, [dispatch]);

  // 🔹 Otomatik giriş devam ediyorsa, LoadingScreen göster
  if (isCheckingLogin) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Welcome" component={WelcomeStack} />
        <RootStack.Screen name="MainBottomTabs" component={MainBottomTabs} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
