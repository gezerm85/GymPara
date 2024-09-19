import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../pages/AppScreens/HomeScreen/HomeScreen";
import DetailScreen from "../../pages/AppScreens/DetailScreen/DetailScreen";
import FitScreen from "../../pages/AppScreens/FitScreen/FitScreen";
import RestScreen from "../../pages/AppScreens/RestScreen/RestScreen";
import { Text } from "react-native";
import { colors } from "../../utils/Colors/Color";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontWeight: "900",
                fontFamily: "DMSans",
                fontSize: 24,
              }}
            >
              Gym<Text style={{ color: colors.MainColor }}>App</Text>
            </Text>
          ),
        }}
        name="HomeScreen"
        component={HomeScreen}
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
