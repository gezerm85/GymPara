import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../../utils/Colors/Color";

const RestScreen = () => {
  const { item } = useRoute().params;
  const navigation = useNavigation();
  const [timeLeft, setTimeLeft] = useState(20);
  let timer;

  const startTime = () => {
    timer = setTimeout(() => {
      if (timeLeft <= 0) {
        navigation.goBack();
        clearTimeout(timer);
      } else {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);
  };

  useEffect(() => {
    startTime();

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{
          uri: "https://img.freepik.com/free-photo/full-length-athlete-sipping-water-from-fitness-bottle-exhausted-after-workout_1098-18878.jpg?w=360&t=st=1689099570~exp=1689100170~hmac=a60d176d8a393f59b8b032dd294005ceedbd048a04c01e542bcffa815ecd4428",
        }}
        style={styles.image}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          <Text style={styles.text}>Sıradaki:</Text> {item?.name}
        </Text>
        <Text style={styles.set}>
          <Text style={styles.text}>Set:</Text> {item?.sets}
        </Text>
      </View>
      <View>
        <Text style={styles.breakText}>DİNLEN</Text>
      </View>

      <View style={styles.timerBox}>
        <MaterialIcons name="timer" size={26} color="black" />
        <Text style={styles.timerText}>{timeLeft}</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => setTimeLeft(timeLeft + 20)}
          style={styles.navButton}
        >
          <Text style={styles.navButtonText}>+ 20</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.navButton}
        >
          <Text style={styles.navButtonText}>ATLA</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: "40%",
    resizeMode: 'cover',
  },
  titleContainer: {
    width: "100%",
    paddingLeft: 16,
    gap: 4,
  },
  title: {
    fontSize: 24,
    fontFamily: "DMSansBold",
    color: "#000",
  },
  set: {
    fontSize: 20,
    fontFamily: "DMSansBold",
    color: "#000",
  },
  text:{
    color: colors.MainColor
  },
  breakText: {
    fontSize: 30,
    fontWeight: "900",
    marginTop: 50,
    textAlign: "center",
  },
  timerText: {
    fontSize: 35,
    fontWeight: "900",
    textAlign: "center",
  },
  timerBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 48,
    gap: 8,
  },
  btnContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    gap: 16,
    marginBottom: 48,
  },
  navButton: {
    width: "100%",
    backgroundColor: colors.MainColor,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 32,
  },
  navButtonText: {
    fontSize: 18,
    fontFamily: "DMSans",
    fontWeight: "600",
    color: "#fff",
  },
});

export default RestScreen;
