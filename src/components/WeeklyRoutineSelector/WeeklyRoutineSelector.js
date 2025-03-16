import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Image,
  Vibration,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../utils/Colors/Color";
import Checkbox from "../../assets/images/Checkbox.png";
import styles from "./WeeklyRoutineSelector.style";

const WeeklyRoutineSelector = ({ title, onSelect }) => {
  const [selected, setSelected] = useState(false);

  const handlePress = () => {
    Vibration.vibrate(100);
    setSelected(!selected);
    onSelect(title);
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handlePress}
        style={() => [
          {
            backgroundColor: selected ? "#E8F2FE" : "#ffff",
            borderWidth: selected ? 2 : 1,
            borderColor: selected ? colors.MainColor : "#D3D3D3",
          },
          styles.button,
        ]}
      >
        <View style={styles.innerContainer}>
          <Text
            style={[
              styles.text,
              { color: selected ? colors.MainColor : colors.textColor },
            ]}
          >
            {title}
          </Text>
        </View>
        {selected && <Image style={styles.image} source={Checkbox} />}
      </Pressable>
    </View>
  );
};

export default WeeklyRoutineSelector;
