import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export const useAppFonts = () => {
  const [fontsLoaded] = useFonts({
    Black: require("../../assets/Fonts/Poppins-Black.ttf"),
    Bold: require("../../assets/Fonts/Poppins-Bold.ttf"),
    ExtraBold: require("../../assets/Fonts/Poppins-ExtraBold.ttf"),
    ExraLight: require("../../assets/Fonts/Poppins-ExtraLight.ttf"),
    Light: require("../../assets/Fonts/Poppins-Light.ttf"),
    Medium: require("../../assets/Fonts/Poppins-Medium.ttf"),
    Regular: require("../../assets/Fonts/Poppins-Regular.ttf"),
    SemiBold: require("../../assets/Fonts/Poppins-SemiBold.ttf"),
    Thin: require("../../assets/Fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [fontsLoaded]);

  return fontsLoaded;
};
