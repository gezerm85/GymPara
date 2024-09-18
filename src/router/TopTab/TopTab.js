import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import StartLevel from "../../pages/AppScreens/HomeScreen/TabScreen/StartLevel";
import MidLevel from "../../pages/AppScreens/HomeScreen/TabScreen/MidLevel";
import ExpertLevel from "../../pages/AppScreens/HomeScreen/TabScreen/ExpertLevel";
import { Text, StyleSheet, } from "react-native";
import { colors } from "../../utils/Colors/Color";

const TopTab = createMaterialTopTabNavigator();


function TopTabs() {
  return (
    <TopTab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: ({ focused }) => {
          let label = "";
          if (route.name === "StartLevel") {
            label = "Başlangıç";
          } else if (route.name === "MidLevel") {
            label = "Orta Seviye";
          } else if (route.name === "ExpertLevel") {
            label = "İleri Seviye";
          }

          return (
            <Text
              style={[
                {
                  color: focused ? "#fff" : colors.MainColor,
                  fontSize: 16,
                },
                styles.label,
              ]}
            >
              {label}
            </Text>
          );
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.MainColor,
          height: "100%",
          borderRadius: 24,
        },
        tabBarStyle: {
          backgroundColor: "#f3f3f3",
          borderRadius: 24,
          marginHorizontal: 16,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarPressColor: "transparent",
      })}
    >
      <TopTab.Screen name="StartLevel" component={StartLevel} />
      <TopTab.Screen name="MidLevel" component={MidLevel} />
      <TopTab.Screen name="ExpertLevel" component={ExpertLevel} />
    </TopTab.Navigator>
  );
}

export default TopTabs;

const styles = StyleSheet.create({
  label: {
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 16,
    fontFamily: "DMSans",
  },
});
