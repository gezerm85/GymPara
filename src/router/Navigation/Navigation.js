import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthStatus, loginUser } from "../../redux/authSlice";
import { loadUserData } from "../../redux/dataSlice";
import { getUserProfile } from "../../redux/userSlice";
import { fetchUserPoints } from "../../redux/pointsSlice";
import { fetchCategories, fetchExercises, fetchWorkouts } from "../../redux/exercisesSlice";
import { fetchCarouselData } from "../../redux/carouselSlice";
import { fetchLeaderboardData } from "../../redux/leaderboardSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Stacks
import WelcomeStack from "../WelcomeStack/WelcomeStack";
import MainBottomTabs from "../MainBottomTabs/MainBottomTabs";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

// Navigation ref
import { navigationRef } from "./navigationUtils";

const Stack = createNativeStackNavigator();

const Navigation = () => { 
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.user);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasLoadedUserData, setHasLoadedUserData] = useState(false);

  // App başlangıcı - sadece bir kez çalışır
  useEffect(() => {
    const initializeApp = async () => { 
      try { 
        console.log('🚀 App başlatılıyor...');
        
        // Auth durumunu kontrol et 
        await dispatch(checkAuthStatus());
        
        // Remember me kontrolü
        const rememberMe = await AsyncStorage.getItem('rememberMe');
        const savedEmail = await AsyncStorage.getItem('rememberedEmail');
        const savedPassword = await AsyncStorage.getItem('rememberedPassword');
        
        // Eğer remember me açıksa ve kaydedilmiş bilgiler varsa otomatik giriş yap
        if (rememberMe === 'true' && savedEmail && savedPassword && !isAuthenticated) {
          console.log('🔄 Otomatik giriş yapılıyor...');
          try {
            await dispatch(loginUser({ email: savedEmail, password: savedPassword }));
          } catch (error) {
            console.log('❌ Otomatik giriş başarısız:', error);
            // Otomatik giriş başarısızsa kaydedilmiş bilgileri sil
            await AsyncStorage.removeItem('rememberMe');
            await AsyncStorage.removeItem('rememberedEmail');
            await AsyncStorage.removeItem('rememberedPassword');
          }
        }
        
        setIsInitialized(true);
      } catch (error) {
        console.error('❌ App initialization error:', error);
        setIsInitialized(true);
      } 
    };

    initializeApp();
  }, []); // Sadece bir kez çalışsın

  // Auth durumu değiştiğinde kullanıcı verilerini yükle
  useEffect(() => {
    if (isAuthenticated && !hasLoadedUserData) {
      console.log('📥 Kullanıcı verileri yükleniyor...');
      setHasLoadedUserData(true);
      
      const loadAllUserData = async () => {
        try {
          // Önce profile'ı yükle (en önemli)
          await dispatch(getUserProfile());
          
          // Sonra diğer verileri paralel olarak yükle
          await Promise.all([
            dispatch(loadUserData()),
            dispatch(fetchUserPoints()),
            dispatch(fetchCategories()),
            dispatch(fetchExercises()),
            dispatch(fetchWorkouts()),
            dispatch(fetchCarouselData()),
            dispatch(fetchLeaderboardData())
          ]);
          
          console.log('✅ Tüm kullanıcı verileri yüklendi');
        } catch (error) {
          console.error('❌ Kullanıcı verileri yüklenirken hata:', error);
        }
      };
      
      loadAllUserData();
    } else if (!isAuthenticated) {
      setHasLoadedUserData(false);
    }
  }, [isAuthenticated, hasLoadedUserData]);

  // Loading durumunda loading screen göster
  if (!isInitialized || loading) {
    return <LoadingScreen />;
  }

  // Routing logic - welcome_completed durumuna göre yönlendirme
  const shouldShowWelcome = isAuthenticated && profile && !profile.welcome_completed;
  
  console.log('🧭 Navigation Render:');
  console.log('  - isAuthenticated:', isAuthenticated);
  console.log('  - profile:', profile ? 'Yüklendi' : 'Yüklenmedi');
  console.log('  - welcome_completed:', profile?.welcome_completed);
  console.log('  - shouldShowWelcome:', shouldShowWelcome);
  console.log('  - Target Screen:', !isAuthenticated ? 'Welcome (Auth)' : shouldShowWelcome ? 'Welcome (Incomplete)' : 'MainBottomTabs');

  // Eğer profile yüklenmemişse ve authenticated ise, loading göster
  if (isAuthenticated && !profile) {
    console.log('⏳ Profile yükleniyor, loading gösteriliyor...');
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          // Kullanıcı giriş yapmamış
          <Stack.Screen name="Welcome" component={WelcomeStack} />
        ) : shouldShowWelcome ? (
          // Kullanıcı giriş yapmış ama welcome tamamlanmamış
          <Stack.Screen name="Welcome" component={WelcomeStack} />
        ) : (
          // Kullanıcı giriş yapmış ve welcome tamamlanmış
          <Stack.Screen name="MainBottomTabs" component={MainBottomTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
