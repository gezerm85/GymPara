import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8f2fe",
    borderRadius: 16,
    width: width * 0.123,
    height: width * 0.123,
  },
});
