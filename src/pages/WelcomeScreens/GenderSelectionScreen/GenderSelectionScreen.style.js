import { StyleSheet } from "react-native";
import { colors } from "../../../utils/Colors/Color";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  bodyContainer: {
    gap: 16,
  },
  title: {
    color: colors.textColor,
    fontSize: 24,
    lineHeight: 30.79,
    textAlign: "center",
    marginTop: 16,
    fontFamily: "Bold",
  },
  buttonBox: {
    marginBottom: 62,
  },
});
