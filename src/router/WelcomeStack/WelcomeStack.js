import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IntroScreen from "../../pages/WelcomeScreens/IntroScreen/IntroScreen";
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

const Stack = createNativeStackNavigator();

const WelcomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerLeft: () => <BackCard />,
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: "#fff",
        },
      }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="IntroScreen"
        component={IntroScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerLeft: () => null,
          headerTitle: () => null,
          headerRight: () => <CardPart value={"1 / 8"} />,
          headerLeftContainerStyle: {
            backgroundColor: "#fff",
          },
        }}
        name="Gender"
        component={GenderSelectionScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => null,
          headerRight: () => <CardPart value={"2 / 8"} />,
        }}
        name="YearSelector"
        component={YearSelectorScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => null,
          headerRight: () => <CardPart value={"3 / 8"} />,
        }}
        name="GoalSelection"
        component={GoalSelectionScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => null,
          headerRight: () => <CardPart value={"4 / 8"} />,
        }}
        name="ActivityLevel"
        component={ActivityLevelscreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => null,
          headerRight: () => <CardPart value={"5 / 8"} />,
        }}
        name="SitUpCapacity"
        component={SitUpCapacityScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => null,
          headerRight: () => <CardPart value={"6 / 8"} />,
        }}
        name="Motivation"
        component={MotivationScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => null,
          headerRight: () => <CardPart value={"7 / 8"} />,
        }}
        name="WeightAndHeight"
        component={WeightAndHeightScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => null,
          headerRight: () => <CardPart value={"8 / 8"} />,
        }}
        name="WorkoutDaysSelection"
        component={WorkoutDaysSelectionScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="PersonalizedPlanCompletion"
        component={PersonalizedPlanCompletionScreen}
      />
    </Stack.Navigator>
  );
};

export default WelcomeStack;