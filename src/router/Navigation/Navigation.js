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
import { auth } from "../../firebase/firebaseConfig";
import { loadUserExercises } from "../../redux/userExercisesSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signIn } from '../../firebase/firebaseAuth';
import { navigationRef } from './navigationUtils';

const RootStack = createNativeStackNavigator();

const Navigation = () => {
  const dispatch = useDispatch();
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
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
        const user = auth.currentUser;
        if (!user) {
          // Otomatik giriş kontrolü
          const rememberMe = await AsyncStorage.getItem('rememberMe');
          const rememberedEmail = await AsyncStorage.getItem('rememberedEmail');
          const rememberedPassword = await AsyncStorage.getItem('rememberedPassword');
          if (rememberMe === 'true' && rememberedEmail && rememberedPassword) {
            try {
              await signIn(rememberedEmail, rememberedPassword);
              await dispatch(loadUserData());
            } catch (e) {
              // Otomatik giriş başarısızsa login ekranı göster
            }
          }
          setIsCheckingLogin(false);
          return;
        }
        await dispatch(loadUserData());
      } finally {
        setIsCheckingLogin(false);
      }
    };
    checkUserAndWelcome();
  }, [dispatch]);

  if (isCheckingLogin) {
    return <LoadingScreen />;
  }

  const isLoggedIn = !!auth.currentUser;
  const welcomeCompleted = userData?.welcomeCompleted === true;

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
