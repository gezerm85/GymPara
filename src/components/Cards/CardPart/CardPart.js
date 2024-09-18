import { Text, View } from "react-native";
import React from "react";
import styles from "./CardPart.style";

const CardPart = ({ value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{value}</Text>
    </View>
  );
};

export default CardPart;
