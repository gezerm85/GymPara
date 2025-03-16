import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import React from "react";
import { colors } from "../../../utils/Colors/Color";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const SportsCard = ({ item }) => {
  const nav = useNavigation();

  

  const handleOnPress = () => {
    nav.navigate("DetailScreen", { item });
  };
  return (
    <TouchableOpacity onPress={handleOnPress} style={styles.container}>
      <View
        style={styles.bodyContainer}
      >
          <Image 
            source={{uri: item.image}}
            style={styles.img}
          />
      </View>
      <View style={styles.innerContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <View style={styles.timeContainer}>
          <View style={styles.blueBar} />
          <Text style={styles.time}>{item.time || "18"}</Text>
        </View>
        </View>
        <View style={styles.iconBox}>
        <Icon
            name="arrow-right" 
            size={24}
            color={colors.MainColor}
            style={styles.icon}
          />
        </View>
    </TouchableOpacity>
  );
};

export default SportsCard;



const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  bodyContainer:{
    width: '20%',
    height: '100%',
  },
  innerContainer: {
    width: '60%',
    height: '100%',
    alignItems: 'start',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingVertical: 2,

  },
  iconBox:{
    width: '20%',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  icon:{
    backgroundColor: '#D8E9FE',
    padding: 8,
    borderRadius: 40,
  },
  img: {
    width: "100%",
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexDirection: "row",
    resizeMode: "cover",
    borderRadius: 16,
  },
  title: {
    fontFamily: "SemiBold",
    fontSize: 16,
    lineHeight: 23.15,
    color: "#000000",
  },
  time: {
    fontFamily: "Regular",
    fontSize: 14,
    lineHeight: 16,
    color: "#000000",
    top: 2,
  },
  timeContainer: {
    flexDirection: "row", 
    alignItems: "center",
  },
  blueBar: {
    width: 2, 
    height: "100%",
    backgroundColor: colors.MainColor, 
    marginRight: 4,
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
 
});
