import { StyleSheet, Text, View, Button, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SportSelection from "../../../components/SportSelection/SportSelection";
import { BlurView } from "expo-blur";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
        <Text>wafasf</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bodyContainer: {
    flex: 5,
    marginBottom: 16,
  },
  innerContainer: {
    flex: 1,
    margin: 16,
  },
});
