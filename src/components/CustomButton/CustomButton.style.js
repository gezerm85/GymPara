import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 55,
    width: width * 0.91666666666666667,
    height: height * 0.07,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    borderRadius: width * 0.088,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 20.83,
    textAlign: "center",
    fontFamily: "Medium",
  },
});
