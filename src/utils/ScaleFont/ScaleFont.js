import { Dimensions } from "react-native";

const { fontScale } = Dimensions.get("window");

export const scaleFont = (size) => size * fontScale;
