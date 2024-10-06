import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image"; 
import dollar from "../../assets/images/dollar.png";

const ScoreComp = () => {
  const score = 400;
  return (
    <TouchableOpacity style={styles.container}>
      <Image style={styles.image} source={require("../../assets/images/dollar.png")} />
      <Text style={styles.title}>{score}</Text>
    </TouchableOpacity>
  );
};

export default ScoreComp;

const styles = StyleSheet.create({
  container:{
    paddingVertical: 4,
    paddingHorizontal: 7,
    flexDirection: 'row',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    borderRadius: 55,
  },
  image:{
    width: 16,
    height: 16,
  },
  title:{
    color: '#fff',
    fontFamily: 'Medium',
    verticalAlign: 'middle',
    top: 1,
  },
});