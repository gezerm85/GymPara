import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import React from "react";

const DetailCard = ({ item }) => {

  return (
    <View style={styles.container}>
      <Image
        style={styles.images}
        source={{uri: item.image}}
        contentFit="cover"
        transition={1000}
      />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.set}>{item.sets}</Text>
      </View>
    </View>
  );
};

export default DetailCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f3f3f3",
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    padding: 6,
    borderRadius: 16,
  },
  innerContainer: {
    gap: 5,
  },
  images: {
    width: 68,
    height: 68,
    borderRadius: 8,
  },
  title: {
    fontFamily: "Bold",
    fontSize: 16,
    color: "#454545",
  },
  set: {
    fontFamily: "Medium",
    fontSize: 14,
    color: "#c4c4c4",
  },
});
