import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../pages/AuthScreens/LoginScreen/LoginScreen";
import RegisterScreen from "../../pages/AuthScreens/RegisterScreen/RegisterScreen";
import GenderSelectionScreen from "../../pages/WelcomeScreens/GenderSelectionScreen/GenderSelectionScreen";
import CardPart from "../../components/Cards/CardPart/CardPart";
import YearSelectorScreen from "../../pages/WelcomeScreens/YearSelectorScreen/YearSelectorScreen";
import ActivityLevelscreen from "../../pages/WelcomeScreens/ActivityLevelScreen/ActivityLevelscreen";
import SitUpCapacityScreen from "../../pages/WelcomeScreens/SitUpCapacityScreen/SitUpCapacityScreen";
import GoalSelectionScreen from "../../pages/WelcomeScreens/GoalSelectionScreen/GoalSelectionScreen";
import MotivationScreen from "../../pages/WelcomeScreens/MotivationScreen/MotivationScreen";
import WeightAndHeightScreen from "../../pages/WelcomeScreens/WeightAndHeightScreen/WeightAndHeightScreen";
import WorkoutDaysSelectionScreen from "../../pages/WelcomeScreens/WorkoutDaysSelectionScreen/WorkoutDaysSelectionScreen";
import PersonalizedPlanCompletionScreen from "../../pages/WelcomeScreens/PersonalizedPlanCompletionScreen/PersonalizedPlanCompletionScreen";
import BackCard from "../../components/Cards/BackCard/BackCard";
import LoginLeft from "../../components/Cards/LoginLeft/LoginLeft";

const Stack = createNativeStackNavigator();

const WelcomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: "",
        headerBackTitleVisible: false,
        headerBackVisible: false,
        headerStyle: { backgroundColor: "#fff" },
        headerShadowVisible: false,
        headerLeft: () => <BackCard />,
      }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
          
        }}
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="RegisterScreen"
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{
          headerLeft: () => <LoginLeft/>,
          headerRight: () => <CardPart value={"1 / 9"} />,
        }}
        name="Gender"
        component={GenderSelectionScreen}
      />
      <Stack.Screen
        options={{
          headerRight: () => <CardPart value={"2 / 9"} />,
        }}
        name="YearSelector"
        component={YearSelectorScreen}
      />
      <Stack.Screen
        options={{
          headerRight: () => <CardPart value={"3 / 9"} />,
        }}
        name="GoalSelection"
        component={GoalSelectionScreen}
      />
      <Stack.Screen
        options={{
          headerRight: () => <CardPart value={"4 / 9"} />,
        }}
        name="ActivityLevel"
        component={ActivityLevelscreen}
      />
      <Stack.Screen
        options={{
          headerRight: () => <CardPart value={"5 / 9"} />,
        }}
        name="SitUpCapacity"
        component={SitUpCapacityScreen}
      />
      <Stack.Screen
        options={{
          headerRight: () => <CardPart value={"6 / 9"} />,
        }}
        name="Motivation"
        component={MotivationScreen}
      />
      <Stack.Screen
        options={{
          headerRight: () => <CardPart value={"7 / 9"} />,
        }}
        name="WeightAndHeight"
        component={WeightAndHeightScreen}
      />
      <Stack.Screen
        options={{
          headerRight: () => <CardPart value={"8 / 9"} />,
        }}
        name="WorkoutDaysSelection"
        component={WorkoutDaysSelectionScreen}
      />
      <Stack.Screen
        options={{
          headerRight: () => <CardPart value={"9 / 9"} />,
        }}
        name="PersonalizedPlanCompletion"
        component={PersonalizedPlanCompletionScreen}
      />
    </Stack.Navigator>
  );
};

export default WelcomeStack;
