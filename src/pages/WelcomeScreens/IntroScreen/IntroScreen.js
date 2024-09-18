import { Text, View, ImageBackground } from "react-native";
import React from "react";
import WallPaper from "../../../assets/images/Rectangle 23.png";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import styles from "./IntroScreen.style";

const IntroScreen = () => {
  const nav = useNavigation();

  return (
    <ImageBackground style={styles.backgroundImage} source={WallPaper}>
      <Text style={styles.title}>Hedeflerine Ulaşmak İçin İlk Adımı At!</Text>
      <Text style={styles.desc}>
        Odaklan, kararlı ol pes etme! Hedeflerine ulaşmak için gereken güce
        sahipsin. İlerle ve başar!
      </Text>
      <View style={styles.buttonBox}>
        <CustomButton
          title={"Hadi Başlayalım"}
          onPress={() => nav.navigate("Gender")}
        />
      </View>
    </ImageBackground>
  );
};

export default IntroScreen;
