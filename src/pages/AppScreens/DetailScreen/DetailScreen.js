import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Vibration
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import DetailCard from "../../../components/Cards/DetailCard/DetailCard";
import AntDesign from "@expo/vector-icons/AntDesign";
import card from '../../../assets/images/Card2.png'

const DetailScreen = () => {
  const { item } = useRoute().params;

  const nav = useNavigation();

  const handleOnPress = () => {
    Vibration.vibrate(25);
    nav.goBack();
  };

  return (
    <View style={styles.container}>
        <ImageBackground
          style={styles.header}
          imageStyle={styles.img}
          source={card}
        >
          <TouchableOpacity style={styles.backBtn} onPress={handleOnPress}>
            <AntDesign
              name="arrowleft"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
          <View style={styles.textBox}>
            <Text style={styles.level}>{item.level}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
          </View>
        </ImageBackground>
      <View style={styles.innerContainer}>
        <DetailCard item={item} />
      </View>
    </View>
  );
};

export default DetailScreen;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  innerContainer: {
    height: '65%',
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: "100%",
    height: '100%',
    resizeMode: "stretch",
  },
  header:{
    width: "100%",
    height: '35%',
    backgroundColor: 'red',
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  backBtn:{
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginHorizontal: 16,
    marginVertical: 46,
    padding: 8,
    borderRadius: 12,
  },
  level:{
    color: '#fff',
    fontSize: 28,
    fontFamily: 'DMSansBold',
  },
  desc:{
    fontSize: 14,
    color: '#fff',
    fontFamily: 'DMSans'
  },
  textBox:{
    gap: 5,
    marginBottom: 16,
    marginLeft: 16,
  },
});
