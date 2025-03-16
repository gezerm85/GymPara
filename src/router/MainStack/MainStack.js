import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../pages/AppScreens/HomeScreen/HomeScreen";
import HeaderTitle from "../../components/HeaderTitle/HeaderTitle";
import HeaderProfile from "../../components/HeaderProfile/HeaderProfile";
import ScoreComp from "../../components/ScoreComp/ScoreComp";
import ProfileScreen from "../../pages/AppScreens/ProfileScreen/ProfileScreen";
import StoreDetailScreen from "../../pages/AppScreens/DetailScreen/StoreDetailScreen";

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
          headerTitle: "Hediyeler",
          headerTitleAlign: 'center',
          headerRight:()=> <ScoreComp/>,
        }}
        name="StoreDetailScreen"
        component={StoreDetailScreen}
      />

    </Stack.Navigator>
  );
};

export default MainStack;
