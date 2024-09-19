import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainStack from "../MainStack/MainStack";
import ProfileScreen from "../../pages/AppScreens/ProfileScreen/ProfileScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { View, Text } from "react-native";
import { colors } from "../../utils/Colors/Color";

const Tab = createBottomTabNavigator();

function MainBottomTabs() {
  const getTabBarVisibility = (route) => {
    const hiddenScreens = ["FitScreen", "DetailScreen", "RestScreen"];
    const routeName = getFocusedRouteNameFromRoute(route);

    return hiddenScreens.includes(routeName) ? "none" : "flex";
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        options={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            display: getTabBarVisibility(route),
          },
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <MaterialCommunityIcons
                name="home-variant"
                size={24}
                color={focused ? colors.MainColor : "#9CA3AF"}
              />
              {focused && (
                <View
                  style={{
                    height: 3,
                    backgroundColor: colors.MainColor,
                    width: 16,
                    marginTop: 4,
                    borderRadius: 20,
                  }}
                />
              )}
            </View>
          ),
          title: () => null,
        })}
        name="Home"
        component={MainStack}
      />
      <Tab.Screen
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
          },
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <FontAwesome5
                name="user-alt"
                size={24}
                color={focused ? colors.MainColor : "#9CA3AF"}
              />
              {focused && (
                <View
                  style={{
                    height: 3,
                    backgroundColor: colors.MainColor,
                    width: 16,
                    marginTop: 4,
                    borderRadius: 20,
                  }}
                />
              )}
            </View>
          ),
          title: () => null,
          headerTitle: "Profil",
        })}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

export default MainBottomTabs;
