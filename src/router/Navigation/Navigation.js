import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthStatus } from "../../redux/authSlice";
import { loadUserData } from "../../redux/dataSlice";
import { getUserProfile } from "../../redux/userSlice";
import { fetchUserPoints } from "../../redux/pointsSlice";
import { fetchCategories, fetchExercises, fetchWorkouts } from "../../redux/exercisesSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Stacks
import WelcomeStack from "../WelcomeStack/WelcomeStack";
import MainBottomTabs from "../MainBottomTabs/MainBottomTabs";

// Navigation ref
import { navigationRef } from "./navigationUtils";

const Stack = createNativeStackNavigator();

const Navigation = () => { 
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const [isInitialized, setIsInitialized] = useState(false);
  

  useEffect(() => {
    const initializeApp = async () => { 
      try {
        // Auth durumunu kontrol et 
        await dispatch(checkAuthStatus());
         
        // Eğer kullanıcı giriş yapmışsa, kullanıcı verilerini yükle
        if (isAuthenticated) {
          await dispatch(loadUserData());
          await dispatch(getUserProfile()); // Profil verilerini de yükle
          await dispatch(fetchUserPoints()); // Puanları yükle
          await dispatch(fetchCategories()); // Egzersiz kategorilerini yükle
          await dispatch(fetchExercises()); // Egzersizleri yükle
          await dispatch(fetchWorkouts()); // Kullanıcı workout'larını yükle
        }
        
        setIsInitialized(true);
      } catch (error) {
        console.error('App initialization error:', error);
        setIsInitialized(true);
      } 
    };

    initializeApp();
  }, [dispatch, isAuthenticated]);

  // Auth durumu değiştiğinde kullanıcı verilerini yükle
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUserData());
      dispatch(getUserProfile()); // Profil verilerini de yükle
      dispatch(fetchUserPoints()); // Puanları yükle
      dispatch(fetchCategories()); // Egzersiz kategorilerini yükle
      dispatch(fetchExercises()); // Egzersizleri yükle
      dispatch(fetchWorkouts()); // Kullanıcı workout'larını yükle
    }
  }, [isAuthenticated, dispatch]);

  // Loading durumunda loading screen göster
  if (!isInitialized || loading) {
    return null; // veya loading component
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Welcome" component={WelcomeStack} />
        ) : (
          <Stack.Screen name="MainBottomTabs" component={MainBottomTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
