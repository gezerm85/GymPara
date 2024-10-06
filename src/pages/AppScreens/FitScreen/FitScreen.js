import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../utils/Colors/Color";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const FitScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const exercise = route.params.item.exercises;
  const current = exercise[index];

  console.log(current);
  
  const handleDonePress = () => {
    if (index + 1 >= exercise.length) {
      navigation.navigate("HomeScreen");
    } else {
      navigation.navigate("RestScreen", { 
        item: exercise[index + 1],
        currentIndex: index + 2,
        total: exercise.length
      });
      setTimeout(() => {
        setIndex(index + 1);
      }, 2000);
    }
  };
  
  const handleOnPrevPress = () => {
    if (index > 0) {
      navigation.navigate("RestScreen", { 
        item: exercise[index - 1],
        total: exercise.length, 
        currentIndex: index - 1
      });
      setIndex(index - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={{ uri: current?.image }} />
      <View style={styles.bodyContainer}>
        <Text style={styles.exerciseName}>{current?.name}</Text>

        <Text style={styles.sets}>X{current?.sets}</Text>

        {/* Done Button */}
        <View style={styles.doneContainer}>
          <TouchableOpacity
            disabled={index === 0}
            onPress={handleOnPrevPress}
            style={[styles.navButton, index === 0 && styles.disabledButton]}
          >
            <FontAwesome5 name="step-backward" size={24} color="#AEAEB2" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDonePress} style={styles.doneButton}>
            <Text style={styles.doneButtonText}>BİTİR</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDonePress} style={styles.navButton}>
            <FontAwesome5 name="step-forward" size={24} color="#AEAEB2" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 400,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  bodyContainer:{
    flex: 1,
    backgroundColor: '#fff',
    borderTopRightRadius: 36,
    borderTopLeftRadius: 36,
    justifyContent: 'center',
    marginBottom: 98,
  },
  exerciseName: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Bold",
    marginBottom: 16,
  },
  sets: {
    textAlign: "center",
    fontSize: 44,
    fontFamily: "SemiBold",
    marginBottom: 36,
  },
  doneContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  doneButton: {
    backgroundColor: colors.MainColor,
    borderRadius: 24,
    paddingHorizontal: 64,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  doneButtonText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Bold",
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  disabledButton: {
    opacity: 0,
  },
  navButtonText: {
    color: "#6d6868",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Bold",
  },
});

export default FitScreen;
