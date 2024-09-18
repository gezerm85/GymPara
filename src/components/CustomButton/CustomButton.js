import { Text, View, Pressable, Vibration } from "react-native";
import React from "react";
import styles from "./CustomButton.style";
import { colors } from "../../utils/Colors/Color";

const CustomButton = ({ title, onPress, press }) => {
  const handleOnPress = () => {
    onPress();
    Vibration.vibrate(25);
  };

  return (
    <View>
      <Pressable
        onPress={handleOnPress}
        style={[
          styles.button,
          {
            backgroundColor:
              press !== "" && press !== 0 ? colors.MainColor : "#767474",
          },
        ]}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default CustomButton;
