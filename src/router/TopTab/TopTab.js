import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import StartLevel from "../../pages/AppScreens/HomeScreen/TabScreen/StartLevel";
import MidLevel from "../../pages/AppScreens/HomeScreen/TabScreen/MidLevel";
import ExpertLevel from "../../pages/AppScreens/HomeScreen/TabScreen/ExpertLevel";
import { Text, StyleSheet, View } from "react-native";
import { colors } from "../../utils/Colors/Color";

const TopTab = createMaterialTopTabNavigator();

function TopTabs() {
  return (
    <TopTab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: ({ focused }) => {
          let label = "";
          let emoji = "";

          if (route.name === "StartLevel") {
            label = "Başlangıç düzey";
            emoji = "🐣";
          } else if (route.name === "MidLevel") {
            label = "Orta Seviye";
            emoji = "💦";
          } else if (route.name === "ExpertLevel") {
            label = "İleri Seviye";
            emoji = "🔥";
          }

          return (
            <View
              style={[
                styles.labelBox,
                {
                  backgroundColor: focused ? colors.MainColor : "#fff",
                  borderRadius: 24,
                  paddingVertical: 11,
                  paddingHorizontal: 12,
                },
              ]}
            >
              <Text
                style={[
                  {
                    color: focused ? "#fff" : colors.MainColor,
                    fontSize: 16,
                    textAlign: "center",
                  },
                  styles.label,
                ]}
              >
                {emoji} {label}
              </Text>
            </View>
          );
        },
        tabBarIndicatorStyle: {
          height: "100%",
          borderRadius: 24,
          backgroundColor: '#fff'
        },
        tabBarStyle: {
          backgroundColor: "#fff",
          borderRadius: 24,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarPressColor: "#ffffff00",
        tabBarItemStyle:{
          width: 'auto',
        },
        tabBarScrollEnabled: true

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
    fontSize: 14,
    lineHeight: 16,
    fontFamily: "SemiBold",
    width: "100%",
    alignSelf: "center",
  },
  labelBox: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});