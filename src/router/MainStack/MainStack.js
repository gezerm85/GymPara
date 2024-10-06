import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../pages/AppScreens/HomeScreen/HomeScreen";
import DetailScreen from "../../pages/AppScreens/DetailScreen/DetailScreen";
import FitScreen from "../../pages/AppScreens/FitScreen/FitScreen";
import RestScreen from "../../pages/AppScreens/RestScreen/RestScreen";
import HeaderTitle from "../../components/HeaderTitle/HeaderTitle";
import HeaderProfile from "../../components/HeaderProfile/HeaderProfile";
import ScoreComp from "../../components/ScoreComp/ScoreComp";
import ProfileScreen from "../../pages/AppScreens/ProfileScreen/ProfileScreen";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerTitle: () => <HeaderTitle/>,
          headerTitleAlign: 'center',
          headerLeft:()=> <HeaderProfile/>,
          headerRight:()=> <ScoreComp/>
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: "Profil",
          headerTitleAlign: 'center',
          headerRight:()=> <ScoreComp/>,
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="DetailScreen"
        component={DetailScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="FitScreen"
        component={FitScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="RestScreen"
        component={RestScreen}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
