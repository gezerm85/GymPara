import React, { useEffect, useState } from "react";
import {
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeStack from "../WelcomeStack/WelcomeStack";
import MainBottomTabs from "../MainBottomTabs/MainBottomTabs";
import { useSelector, useDispatch } from "react-redux";
import { loadUserData } from "../../redux/dataSlice";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { loadFavoritesFromStorage } from "../../redux/FavoriteSlice";
import { loadUserExercises } from "../../redux/userExercisesSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../../services/apiAuth';
import { navigationRef } from './navigationUtils';

const RootStack = createNativeStackNavigator();

const Navigation = () => {
  const dispatch = useDispatch();
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [welcomeCompleted, setWelcomeCompleted] = useState(false);
  const { userData } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadFavoritesFromStorage());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(loadUserExercises());
  }, [dispatch]);
  
  useEffect(() => {
    const checkUserAndWelcome = async () => {
      try {
        // Token kontrolü
        const authToken = await AsyncStorage.getItem('authToken');
        const userDataString = await AsyncStorage.getItem('userData');
        
        if (!authToken || !userDataString) {
          // Otomatik giriş kontrolü
          const rememberMe = await AsyncStorage.getItem('rememberMe');
          const rememberedEmail = await AsyncStorage.getItem('rememberedEmail');
          const rememberedPassword = await AsyncStorage.getItem('rememberedPassword');
          if (rememberMe === 'true' && rememberedEmail && rememberedPassword) {
            try {
              const result = await loginUser({ email: rememberedEmail, password: rememberedPassword });
              if (result.token && result.user) {
                await AsyncStorage.setItem('authToken', result.token);
                await AsyncStorage.setItem('userData', JSON.stringify(result.user));
                await dispatch(loadUserData());
                setIsLoggedIn(true);
                setWelcomeCompleted(true); // Veritabanında welcome_completed: true
              }
            } catch (e) {
              console.log('Otomatik giriş başarısız:', e.message);
              setIsLoggedIn(false);
              setWelcomeCompleted(false);
            }
          } else {
            setIsLoggedIn(false);
            setWelcomeCompleted(false);
          }
        } else {
          // Token varsa kullanıcı verilerini yükle
          await dispatch(loadUserData());
          setIsLoggedIn(true);
          setWelcomeCompleted(true); // Veritabanında welcome_completed: true
        }
      } finally {
        setIsCheckingLogin(false);
      }
    };
    checkUserAndWelcome();
  }, [dispatch]);

  if (isCheckingLogin) {
    return <LoadingScreen />;
  }

  console.log('Navigation - isLoggedIn:', isLoggedIn, 'welcomeCompleted:', welcomeCompleted);

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn || !welcomeCompleted ? (
          <RootStack.Screen name="Welcome" component={WelcomeStack} />
        ) : (
          <RootStack.Screen name="MainBottomTabs" component={MainBottomTabs} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
