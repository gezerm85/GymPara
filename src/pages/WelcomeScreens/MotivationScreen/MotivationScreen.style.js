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
  bodyContainer: {
    gap: 16,
    marginBottom: 150,
  },
  btnbox: {
    marginBottom: 62,
  },
  title: {
    marginTop: 16,
    fontSize: 24,
    color: colors.textColor,
    fontFamily: "Bold",
    width: width * 0.8,
    textAlign: "center",
  },
});
