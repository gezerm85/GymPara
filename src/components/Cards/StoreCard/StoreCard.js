import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import Rectangle from "../../../assets/images/Rectangle.png";
import Gift from "../../../assets/images/gift.png";
import { colors } from "../../../utils/Colors/Color";
import { useNavigation } from "@react-navigation/native";

const StoreCard = ({ item }) => {
  const nav = useNavigation();
  const handleOnPress = () => {
   // nav.navigate('StoreDetailScreen', {item});
    nav.navigate("Home", { screen: "StoreDetailScreen", params: { item: item} });

  };
  return (
    <Pressable onPress={handleOnPress} style={styles.container}>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={Rectangle} />
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>
          {item.price}

          <Text style={{ color: colors.textColor }}> GP</Text>
        </Text>
      </View>
      <View style={styles.giftContainer}>
        <Image style={styles.gift} source={Gift} />
      </View>
    </Pressable>
  );
};

export default StoreCard;

const styles = StyleSheet.create({
  container: {
    height: 88,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    gap: 16,
  },
  imgContainer: {
    height: "100",
    backgroundColor: "#f5f5f5",
    borderRadius: 24,
  },
  bodyContainer: {
    flex: 1,
  },
  giftContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  title: {
    fontFamily: "Medium",
    fontSize: 16,
  },
  img: {
    width: 88,
    height: 88,
  },
  gift: {
    width: 20,
    height: 20,
  },
  price: {
    fontFamily: "ExtraBold",
    color: colors.MainColor,
  },
});
