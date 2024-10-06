import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    lineHeight: 38.4,
    textAlign: "center",
    width: width * 0.8,
    marginBottom: 16,
    fontFamily: "Bold",
    
  },
  desc: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 25.6,
    textAlign: "center",
    marginBottom: 26,
    width: width * 0.9,
    fontFamily: "Regular",
  },
  buttonBox: {
    marginBottom: 51,
  },
});
