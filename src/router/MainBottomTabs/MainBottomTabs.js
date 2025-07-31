import React, { useState } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainStack from "../MainStack/MainStack";
import AnalysisScreen from "../../pages/AppScreens/AnalysisScreen/AnalysisScreen";
import StoreScreen from "../../pages/AppScreens/StoreScreen/StoreScreen";
import GiftScreen from "../../pages/AppScreens/GiftScreen/GiftScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import TabBarIcon from "../../components/TabBarIcon/TabBarIcon";
import ExercisePickerModal from '../../pages/AppScreens/ExercisePickerModal/ExercisePickerModal.js';
import MainButton from '../../components/CustomBottomTabNavigator/MainButton';

const Tab = createBottomTabNavigator();

const getTabBarVisibility = (route) => {
  const hiddenScreens = [
    "FitScreen",
    "DetailScreen",
    "RestScreen",
    "ProfileScreen",
    "StoreDetailScreen",
  ];
  const routeName = getFocusedRouteNameFromRoute(route);
  return hiddenScreens.includes(routeName) ? "none" : "flex";
};

function MainBottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Tüm header'ları kapat
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          height: 64,
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          display: getTabBarVisibility(route),
          paddingTop: 22,
        },
        tabBarShowLabel: false,
      })}
    >
      {/* Home Screen */}
      <Tab.Screen
        name="Home"
        component={MainStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              activeIcon={require("../../assets/images/BottomNav/Home.png")}
              inactiveIcon={require("../../assets/images/BottomNav/Home1.png")}
              title={"Anasayfa"}
            />
          ),
        }}
      />

      {/* Analysis Screen */}
      <Tab.Screen
        name="AnalysisScreen"
        component={AnalysisScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              activeIcon={require("../../assets/images/BottomNav/analysis.png")}
              inactiveIcon={require("../../assets/images/BottomNav/analysis1.png")}
              title={"Analizler"}
            />
          ),
        }}
      />

      {/* Timer Screen */}
      <Tab.Screen
        name='ExercisePickerModal'
        component={ExercisePickerModal}
        options={{
          tabBarIcon:()=> <MainButton/>
        }}
      />

      {/* Store Screen */}
      <Tab.Screen
        name="StoreScreen"
        component={StoreScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              activeIcon={require("../../assets/images/BottomNav/store.png")}
              inactiveIcon={require("../../assets/images/BottomNav/Store1.png")}
              title={"Mağaza"}
            />
          ),
        }}
      />

      {/* Gift Screen */}
      <Tab.Screen
        name="GiftScreen"
        component={GiftScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              activeIcon={require("../../assets/images/BottomNav/Gift.png")}
              inactiveIcon={require("../../assets/images/BottomNav/Gift1.png")}
              title={"Bonuslar"}
            />
          ),
        }}
      />

    </Tab.Navigator>
  );
}

export default MainBottomTabs;