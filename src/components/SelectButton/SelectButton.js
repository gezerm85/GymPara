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
import styles from "./SelectButton.style";

const SelectButton = ({ title, image, selected, onSelect, textDesc }) => {
  const handleOnSelect = () => {
    onSelect();
    Vibration.vibrate(25);
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handleOnSelect}
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
          <Image style={styles.image} source={image} />
          <View>
            <Text
              style={[
                styles.text,
                { color: selected ? colors.MainColor : colors.textColor },
              ]}
            >
              {title}
            </Text>

            {textDesc !== "" ? (
              <Text
                style={[
                  styles.textDesc,
                  { color: selected ? colors.MainColor : colors.textColor },
                ]}
              >
                {textDesc}
              </Text>
            ) : null}
          </View>
        </View>
        {selected && <Image style={styles.image} source={Checkbox} />}
      </Pressable>
    </View>
  );
};

export default SelectButton;
