import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { colors } from "../../utils/Colors/Color";

const TabBarIcon = ({ focused, activeIcon, inactiveIcon, title }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={focused ? activeIcon : inactiveIcon}
      />
      <Text style={[styles.title, {
        color: focused ? colors.MainColor : '#000'
      }]}>{title}</Text>
    </View>
  );
};

export default TabBarIcon;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },
  image: {
    width: 24,
    height: 24,
  },
  title:{
    fontFamily: 'Regular',
    fontSize: 12,
  },
});
