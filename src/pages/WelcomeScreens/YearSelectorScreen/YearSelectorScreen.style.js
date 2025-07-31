import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../utils/Colors/Color";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    color: colors.textColor,
    fontSize: 24,
    lineHeight: 31,
    textAlign: "center",
    fontFamily: "Bold",
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
    fontFamily: "Bold",
  },
  selectedText: {
    fontSize: 34,
    color: colors.MainColor,
    textAlign: "center",
    fontFamily: "Bold",
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

export default styles;
