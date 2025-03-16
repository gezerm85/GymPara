import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ActivitiesScreen from "../../pages/TopTabs/ActivitiesScreen";
import FavoritesScreen from "../../pages/TopTabs/FavoritesScreen";

const Tab = createMaterialTopTabNavigator();

const TopTabsNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: "white",
      tabBarInactiveTintColor: "#aaa",
      tabBarStyle: { backgroundColor: "#007BFF" },
      tabBarIndicatorStyle: { backgroundColor: "white" },
    }}
  >
    <Tab.Screen name="Aktiviteler" component={ActivitiesScreen} />
    <Tab.Screen name="Favoriler" component={FavoritesScreen} />
  </Tab.Navigator>
  );
};

export default TopTabsNavigator;
