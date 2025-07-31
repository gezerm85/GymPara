import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Image } from "expo-image";
import { colors } from "../../utils/Colors/Color";

// Ekran genişliğine göre dinamik ikon boyutu hesaplama
const { width } = Dimensions.get("window");
const iconSize = Math.max(24, width * 0.06); // Minimum 24, yoksa %6 oranında

const TabBarIcon = ({ focused, activeIcon, inactiveIcon, title }) => {
  return (
    <View style={styles.container}>
      <Image
        style={[styles.image, { width: iconSize, height: iconSize }]}
        source={focused ? activeIcon : inactiveIcon}
      />
      <Text style={[styles.title, { color: focused ? colors.MainColor : "#000" }]}>
        {title}
      </Text>
    </View>
  );
};

export default TabBarIcon;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  image: {
    // Boyutlar component'te hesaplanıyor
  },
  title: {
    fontFamily: "Regular",
    fontSize: 12,
    width: '100%',
  },
});
