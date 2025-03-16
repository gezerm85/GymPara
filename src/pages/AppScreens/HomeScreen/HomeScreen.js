import { StyleSheet, Text, View, Button, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CarouselComponent from "../../../components/CarouselComponent/CarouselComponent";
import TopTabsNavigator from "../../../router/TopTabsNavigator/TopTabsNavigator";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
     <View style={styles.bodyContainer}>
      <CarouselComponent/>
      </View>
      <View style={styles.innerContainer}>
      <Text>Home</Text>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bodyContainer: {
    flex: 1,
    marginBottom: 16,
  },
  innerContainer: {
    flex: 2,
    width: "100%",
  },
});

