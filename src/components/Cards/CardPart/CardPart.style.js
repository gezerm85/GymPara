import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../utils/Colors/Color";

export default styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.gray,
    marginRight: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 11,
  },
  text: {
    fontWeight: "500",
    fontFamily: "DMSans",
    fontSize: 14,
    lineHeight: 18.23,
    textAlign: "center",
    color: colors.MainColor,
  },
});