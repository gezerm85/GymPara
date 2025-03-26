import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ActivitiesScreen from "../../pages/TopTabs/ActivitiesScreen";
import FavoritesScreen from "../../pages/TopTabs/FavoritesScreen";


const Tab = createMaterialTopTabNavigator();

const TopTabsNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: "#000",
      tabBarInactiveTintColor: "#aaa",
      tabBarStyle: { backgroundColor: "#fff" },
      tabBarIndicatorStyle: { backgroundColor: "#0166FF" },
    }}
  >
    <Tab.Screen name="Aktiviteler" component={ActivitiesScreen} />
    <Tab.Screen name="Favoriler" component={FavoritesScreen} />
  </Tab.Navigator>
  );
};

export default TopTabsNavigator;
