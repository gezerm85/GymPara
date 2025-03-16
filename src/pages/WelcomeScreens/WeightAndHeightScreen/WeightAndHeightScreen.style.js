import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../../utils/Colors/Color";

const { width } = Dimensions.get("window");

export default styles = StyleSheet.create({
  container: {
    backgroundColor: "#fcfcfc",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  btnBox: {
    marginBottom: 62,
  },
  title: {
    fontFamily: "Bold",
    fontSize: 24,
    color: colors.textColor,
    marginTop: 16,
    width: width * 0.7,
    textAlign: "center",
  },
});
