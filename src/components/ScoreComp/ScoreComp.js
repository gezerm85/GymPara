import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Image } from "expo-image"; 
import { useSelector, useDispatch } from "react-redux";

const ScoreComp = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.user);

  


  // Puanları formatla (10000 -> 10.000)
  const formatPoints = (points) => {
    if (loading) return "...";
    return points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <TouchableOpacity style={styles.container}>
      <Image style={styles.image} source={require("../../assets/images/dollar.png")} />
      <Text style={styles.title}>{formatPoints(profile?.point || 0)}</Text>
    </TouchableOpacity>
  );
};

export default ScoreComp;

const styles = StyleSheet.create({
  container:{
    paddingVertical: 4,
    paddingHorizontal: 7,
    paddingRight: 10,
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