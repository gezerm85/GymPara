import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export const useAppFonts = () => {
  const [fontsLoaded] = useFonts({
    DMSans: require("../../assets/Fonts/DMSans.ttf"),
    DMSansBold: require("../../assets/Fonts/DMSans-Bold.ttf"),
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
