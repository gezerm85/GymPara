import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { colors } from "../../../utils/Colors/Color";
import { useNavigation } from "@react-navigation/native";
import play from '../../../assets/images/Play.png'

const BonusCard = ({item}) => {


  return (
    <Pressable onPress={null} style={styles.container}>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={item.photo} />
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>
          {item.duration}
          <Text style={{ color: colors.MainColor }}> Bonus</Text>
        </Text>
        <Text style={styles.desc}>{item.description}</Text>
      </View>
      <View style={styles.giftContainer}>
        <Image style={styles.gift} source={play} />
        <Text style={styles.points}>{item.points}</Text>
      </View>
    </Pressable>
  );
};

export default BonusCard;

const styles = StyleSheet.create({
  container: {
    height: 115,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 16,
  },
  imgContainer: {
    height: "100",
    width: 88,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyContainer: {
    flex: 1,
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    right: 20,
  },
  giftContainer: {
    padding: 12,
    backgroundColor: "#0166FF1A",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    flexDirection: 'row',
    gap: 6,
    marginRight: 12,
  },
  title: {
    fontFamily: "SemiBold",
    fontSize: 18,
    maxWidth: 124,
    
  },
  desc:{
    fontFamily: 'Regular',
    fontSize: 12,
    color: '#404040',
    maxWidth: 124,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 16,
  },
  gift: {
    width: 20,
    height: 20,
  },
  points: {
    fontFamily: "Medium",
    color: colors.MainColor,
    fontSize: 14,
    textAlignVertical: 'center'
  },
});
