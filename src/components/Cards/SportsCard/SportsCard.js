import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { colors } from "../../../utils/Colors/Color";
import { useNavigation } from "@react-navigation/native";

const SportsCard = ({ item }) => {
  const nav = useNavigation();

  

  const handleOnPress = () => {
    nav.navigate("DetailScreen", { item });
  };
  return (
    <TouchableOpacity onPress={handleOnPress} style={styles.container}>
      <ImageBackground
        source={{uri: item.image}}
        style={styles.img}
        imageStyle={styles.imageRadius}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.desc}>{item.description}</Text>
        </View>
        {/* <View style={styles.box}>
          <Text style={styles.pro}>{item.pro}</Text>
        </View> */}
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default SportsCard;

const { width, height } = Dimensions.get("window");


const styles = StyleSheet.create({
  container: {
    width: width * 0.917,
    height: height * 0.1951,
    marginTop: 16,
  },
  imageRadius: {
    borderRadius: height * 0.02,
  },
  innerContainer: {
    gap: 4,
    marginBottom: 16,
    marginLeft: 16,
  },
  img: {
    width: "100%",
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexDirection: "row",
    resizeMode: "contain",
  },
  title: {
    fontFamily: "DMSans",
    fontWeight: "600",
    fontSize: 17,
    lineHeight: 23.15,
    color: "#fff",
  },
  desc: {
    fontFamily: "DMSans",
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 16,
    color: "#fff",
  },
  box: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 16,
    marginRight: 16,
    backgroundColor: "#D6EFFF",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  pro: {
    fontFamily: "DMSansBold",
    fontSize: 11,
    lineHeight: 13,
    color: colors.MainColor,
  },
});
