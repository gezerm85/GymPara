import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../utils/Colors/Color";

const { width, height } = Dimensions.get("window");

export default styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    width: width,
    height: height * 0.07,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  text: {
    textAlign: "center",
    fontFamily: "Medium",
    fontSize: 16,
    width: width * 0.8,
  },

  image: {
    resizeMode: "contain",
    width: 25,
    height: 25,
    right: 16,
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
