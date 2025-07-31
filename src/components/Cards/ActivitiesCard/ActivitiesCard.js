import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome6";
import { colors } from "../../../utils/Colors/Color";
import { toggleFavorite } from "../../../redux/FavoriteSlice";
import { useDispatch, useSelector } from "react-redux";

const ActivitiesCard = ({ item }) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites.items);
  
    const isActive = favorites.some((fav) => fav.id === item.id);
  
    const handleOnpress = () => {
      dispatch(toggleFavorite(item));
    };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Icon
      onPress={handleOnpress}
        name={"star"}
        size={20}
        color={isActive ? colors.MainColor : "#AFAFAF"}
        solid={isActive}
      />
    </View>
  );
};

export default ActivitiesCard;

const styles = StyleSheet.create({
  card: {
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderColor: "#E3E3E3",
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
    color: "#333",
  },
});
