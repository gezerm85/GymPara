import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../utils/Colors/Color";

const HeaderTitle = () => {
  return (
    <View>
      <Text style={styles.title}>
        Gym<Text style={styles.highlightedText}>Para</Text>
      </Text>
    </View>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({
  title: {
    fontFamily: "ExtraBold",
    fontSize: 22,
    color: "#1a1a1a",
  },
  highlightedText: {
    color: colors.MainColor,
  },
});
