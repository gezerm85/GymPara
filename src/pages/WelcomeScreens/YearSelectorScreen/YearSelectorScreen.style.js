import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../utils/Colors/Color";

const { width, height } = Dimensions.get("window");

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    color: colors.textColor,
    fontSize: 24,
    lineHeight: 30.79,
    textAlign: "center",
    fontFamily: "DMSansBold",
    marginTop: 16,
  },
  bodyContainer: {
    height: height * 0.3,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 150,
  },
  scrollContainer: {
    paddingVertical: height * 0.155 - 25,
    alignItems: "center",
  },
  yearItem: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 34,
    color: "#CCCBD0",
    textAlign: "center",
    fontFamily: "DMSansBold",
  },
  selectedText: {
    fontSize: 34,
    color: colors.MainColor,
    textAlign: "center",
    fontFamily: "DMSansBold",
  },
  selectedIndicator: {
    position: "absolute",
    top: height * 0.15 - 25,
    width: width - 32,
    height: 60,
    borderColor: colors.MainColor,
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: "#E8F2FE",
    zIndex: -1,
    marginHorizontal: 16,
  },
  btnBox: {
    marginBottom: 62,
  },
});