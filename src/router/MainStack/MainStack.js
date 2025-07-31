import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../pages/AppScreens/HomeScreen/HomeScreen";
import ProfileScreen from "../../pages/AppScreens/ProfileScreen/ProfileScreen";
import StoreDetailScreen from "../../pages/AppScreens/DetailScreen/StoreDetailScreen";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Tüm header'ları kapat
      }}
    >
      <Stack.Screen

        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
      />
      <Stack.Screen
        name="StoreDetailScreen"
        component={StoreDetailScreen}
        options={{
          headerShown: true,
     
          headerTitleAlign: 'center',

        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
