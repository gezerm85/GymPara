import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Vibration,
  FlatList,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import DetailCard from "../../../components/Cards/DetailCard/DetailCard";
import AntDesign from "@expo/vector-icons/AntDesign";
import card from "../../../assets/images/Card2.png";
import { colors } from "../../../utils/Colors/Color";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const DetailScreen = () => {
  const { item } = useRoute().params;

  

  const nav = useNavigation();

  const handleOnPress = ()=>{
    nav.navigate("FitScreen", {  item }) 
  }

  const handleOnGoBack = () => {
    Vibration.vibrate(25);
    nav.goBack();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.header}
        imageStyle={styles.img}
        source={{uri: item.image}}
      >
        <TouchableOpacity style={styles.backBtn} onPress={handleOnGoBack}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.textBox}>
          <Text style={styles.level}>{item.level}</Text>
          <Text style={styles.desc}>{item.desc}</Text>
        </View>
      </ImageBackground>
      <View style={styles.innerContainer}>
        <View style={styles.explanation}>
          <Text style={styles.title}>
            Egzersizlerini daha etkin bir şekilde yapmak için ısının.
          </Text>
          <View style={styles.timeBox}>
            <Icon
              name="clock-time-three-outline"
              size={24}
              color={colors.MainColor}
            />
            <Text style={styles.time}>10 dakika</Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
        <Text style={styles.exerciseText}>Egzersizler</Text>
        <FlatList
          data={item.exercises}
          renderItem={({item})=><DetailCard item={item} />}
          keyExtractor={(item)=>item.id.toString()}
          contentContainerStyle={{gap: 16}}
          showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity onPress={handleOnPress} style={styles.btnBox}>
          <Text style={styles.btnText}>Başlat</Text>
        </TouchableOpacity>
        </View>
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
    height: "70%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    position: 'relative'
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
  header: {
    width: "100%",
    height: "30%",
    backgroundColor: "red",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  backBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginHorizontal: 16,
    marginVertical: 46,
    padding: 8,
    borderRadius: 12,
  },
  level: {
    color: "#fff",
    fontSize: 28,
    fontFamily: "DMSansBold",
  },
  desc: {
    fontSize: 14,
    color: "#fff",
    fontFamily: "DMSans",
  },
  textBox: {
    gap: 5,
    marginBottom: 16,
    marginLeft: 16,
  },
  explanation: {
    width: "100%",
    height: "20%",
    padding: 16,
  },
  title: {
    fontWeight: "400",
    color: colors.textColor,
    fontSize: 14,
    lineHeight: 21,
    width: "80%",
    fontFamily: 'DMSans'
  },
  timeBox:{
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#E8F2FE',
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 14,
    borderRadius: 5,
    elevation: 1,
    marginTop: 16,
  },
  time:{
    fontFamily: 'DMSansBold',
    textAlignVertical: 'center',
    fontSize: 16,
    color: colors.MainColor
  },
  bottomContainer:{
    width: '100%',
    height: '80%',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  exerciseText:{
    fontFamily:'DMSansBold',
    color: '#2b2b2b',
    fontSize: 20,
    marginBottom: 16,
  },
  btnBox:{
    backgroundColor: colors.MainColor,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    marginTop: 10,
    marginBottom: 16,
    borderRadius: 16
  },
  btnText:{
    fontFamily: 'DMSansBold',
    fontSize: 24,
    color: '#fff'
  },
});
