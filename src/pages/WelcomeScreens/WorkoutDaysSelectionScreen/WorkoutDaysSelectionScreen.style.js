import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../utils/Colors/Color";

const { width, height } = Dimensions.get("window");

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Bold",
    fontSize: 24,
    lineHeight: 30.79,
    textAlign: "center",
    marginTop: 16,
    color: colors.textColor,
    width: width * 0.8,
  },
  bodyContainer: {
    gap: 16,
  },
  btnBox: {
    marginBottom: 62,
  },
});
