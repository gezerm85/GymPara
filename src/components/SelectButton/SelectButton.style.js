import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../utils/Colors/Color";

const { width, height } = Dimensions.get("window");

export default styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    width: width,
    height: height * 0.105,
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
    fontFamily: "Medium",
    fontSize: 16,
  },
  textDesc: {
    fontFamily: "Medium",
    fontSize: 14,
  },
  image: {
    resizeMode: "contain",
    width: 25,
    height: 25,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
});
