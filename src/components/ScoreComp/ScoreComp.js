import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Image } from "expo-image"; 
import { useSelector, useDispatch } from "react-redux";
import { fetchUserPoints } from "../../redux/pointsSlice.js";

const ScoreComp = () => {
  const dispatch = useDispatch();
  const { currentPoints, loading } = useSelector((state) => state.points);

  useEffect(() => {
    // Component mount olduğunda puanları getir
    dispatch(fetchUserPoints());
  }, [dispatch]);

  // Puanları formatla (10000 -> 10.000)
  const formatPoints = (points) => {
    if (loading) return "...";
    return points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <TouchableOpacity style={styles.container}>
      <Image style={styles.image} source={require("../../assets/images/dollar.png")} />
      <Text style={styles.title}>{formatPoints(currentPoints)}</Text>
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