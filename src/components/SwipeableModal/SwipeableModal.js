import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Pressable,
  Platform,
} from "react-native";
import { colors } from "../../utils/Colors/Color";
import google from "../../assets/images/SocialVector/Google.svg";
import apple from "../../assets/images/SocialVector/Apple.svg";
import facebook from "../../assets/images/SocialVector/Facebook.svg";
import LoginButton from "../LoginButton/LoginButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const SwipeableModal = ({ isVisible, onClose }) => {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  // Modal görünürlüğünü izleyerek animasyonu tetikleyin
  useEffect(() => {
    if (isVisible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) =>
      Math.abs(gestureState.dy) > 5,
    onPanResponderMove: (_, gestureState) => {
      translateY.setValue(Math.max(0, gestureState.dy));
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 100 || gestureState.vy > 0.5) {
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          onClose && onClose();
        });
      } else {
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const goBack = () =>{
    onClose()
  } 

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backContainer} onPress={goBack} >
      </Pressable>
      <Animated.View
        style={[styles.modal, { transform: [{ translateY }] }]}
        {...panResponder.panHandlers}
      >
        <View style={styles.line} />
        <Text style={styles.title}>Giriş yapma tercihinizi seçin!</Text>
        <View style={styles.container}>
          <LoginButton vector={google} title={"Google ile devam et"} />
          {Platform.OS === "android" && (
            <LoginButton vector={facebook} title="Facebook ile devam et" />
          )}
          <LoginButton vector={apple} title={"Apple ile devam et"} />
        </View>

        <Pressable style={styles.bottomContainer}>
          <Text style={styles.text}>
            Hesap oluşturmadan
            <Text style={styles.textSpan}> devam et</Text>
          </Text>
          <Icon name="chevron-right" size={24} color={colors.MainColor} />
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backContainer:{
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modal: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: SCREEN_HEIGHT / 2,
    backgroundColor: "#F6F6F6",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
    padding: 16,
  },
  container: {
    gap: 16,
    marginTop: 24,
  },
  line: {
    width: 35,
    height: 5,
    backgroundColor: "#D2D2D2",
    borderRadius: 100,
    alignSelf: "center",
  },
  title: {
    fontFamily: "Medium",
    fontSize: 20,
    color: colors.textColor,
    marginTop: 24,
  },
  bottomContainer: {
    marginTop: 34,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.textColor,
    fontFamily: "Medium",
    textAlign: "center",
    includeFontPadding: false,
    fontSize: 16,
  },
  textSpan: {
    color: colors.MainColor,
  },
});

export default SwipeableModal;
