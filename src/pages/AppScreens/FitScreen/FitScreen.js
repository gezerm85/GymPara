import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { colors } from "../../../utils/Colors/Color";

const FitScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const exercise = route.params.item.exercises;
  const current = exercise[index];

  const handleDonePress = () => {
    if (index + 1 >= exercise.length) {
      navigation.navigate("HomeScreen");
    } else {
      navigation.navigate("RestScreen", { item: exercise[index + 1] });
      setTimeout(() => {
        setIndex(index + 1);
      }, 2000);
    }
  };

  const handleOnPrevPress = () => {
    navigation.navigate("RestScreen", { item: exercise[index - 1] });
    setTimeout(() => {
      setIndex(index - 1);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={{ uri: current?.image }} />

      <Text style={styles.exerciseName}>{current?.name}</Text>

      <Text style={styles.sets}>x{current?.sets}</Text>

      {/* Done Button */}
      <View style={styles.doneContainer}>
        <TouchableOpacity onPress={handleDonePress} style={styles.doneButton}>
          <Ionicons name="checkmark-circle" size={24} color="#fff" />
          <Text style={styles.doneButtonText}>BİTİR</Text>
        </TouchableOpacity>
      </View>

      {/* Previous & Skip Buttons */}
      <View style={styles.navButtonsContainer}>
        <TouchableOpacity
          disabled={index === 0}
          onPress={handleOnPrevPress}
          style={[styles.navButton, index === 0 && styles.disabledButton]}
        >
          <Ionicons name="play-skip-back" size={22} color="#6d6868" />
          <Text style={styles.navButtonText}>ÖNCEKİ</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDonePress} style={styles.navButton}>
          <Ionicons name="play-skip-forward" size={22} color="#3f3d3d" />
          <Text style={styles.navButtonText}>SIRADAKİ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: 400,
    borderRadius: 10,
  },
  exerciseName: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  sets: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 45,
    fontWeight: "bold",
  },
  doneContainer: {
    paddingHorizontal: 16,
  },
  doneButton: {
    backgroundColor: colors.MainColor,
    marginTop: 50,
    borderRadius: 30,
    padding: 15,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  doneButtonText: {
    color: "#fff",
    fontFamily: "DMSansBold",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "DMSans",
  },
  navButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    paddingHorizontal: 16,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 30,
    padding: 15,
    width: "45%",
    backgroundColor: "#f0f0f0",
    elevation: 2,
    marginBottom: 48,
  },
  disabledButton: {
    opacity: 0.5,
  },
  navButtonText: {
    color: "#6d6868",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});

export default FitScreen;
