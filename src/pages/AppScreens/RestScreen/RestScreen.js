import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../utils/Colors/Color";

const RestScreen = () => {
  const { item, currentIndex, total } = useRoute().params;
  const navigation = useNavigation();
  const [timeLeft, setTimeLeft] = useState(20);
  let timer;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  useEffect(() => {
    timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer); 
          navigation.goBack(); 
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.bodyContainer}>
        <Text style={styles.currentIndex}>{`Sıradaki ${currentIndex}/${total}`}</Text>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item?.name}</Text>
          <Text style={styles.set}>X {item?.sets}</Text>
        </View>
        <View>
          <Text style={styles.breakText}>Dinlenin</Text>
        </View>

        <View style={styles.timerBox}>
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => setTimeLeft(prevTime => prevTime + 20)}
            style={styles.increaseButton}
          >
            <Text style={styles.increaseButtonText}>+ 20</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.skipButton}
          >
            <Text style={styles.skipButtonText}>ATLA</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor:'#ffffff'
  },
  image: {
    width: "100%",
    height: "40%",
    resizeMode: "cover",
  },
  bodyContainer:{
    backgroundColor: '#fff',
    alignItems: 'center',
    borderTopRightRadius: 36,
    borderTopLeftRadius: 36,
  },
  currentIndex:{
    fontFamily: 'Bold',
    fontSize: 14,
    width: '100%',
    paddingLeft: 16,
  },
  titleContainer: {
    width: "100%",
    paddingHorizontal: 16,
    gap: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontFamily: "Medium",
    color: "#000",
  },
  set: {
    fontSize: 16,
    fontFamily: "SemiBold",
    color: "#000",
    textAlignVertical: "center",
  },
  breakText: {
    fontSize: 30,
    marginTop: 50,
    textAlign: "center",
    fontFamily: "Bold",
  },
  timerText: {
    fontSize: 35,
    textAlign: "center",
    fontFamily: "SemiBold",
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
  increaseButton: {
    width: "100%",
    backgroundColor: "#E8F2FE",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 64,
  },
  skipButton: {
    width: "100%",
    backgroundColor: colors.MainColor,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 64,
    marginBottom: 98,
  },
  skipButtonText: {
    fontSize: 14,
    fontFamily: "SemiBold",
    color: "#fff",
  },
  increaseButtonText: {
    fontSize: 14,
    fontFamily: "SemiBold",
    color: colors.MainColor,
  },
});

export default RestScreen;