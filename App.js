import React, { useCallback } from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import Navigation from './src/router/Navigation/Navigation'
import { useAppFonts } from "./src/utils/Fonts/useAppFonts";
import * as SplashScreen from "expo-splash-screen";
import { store } from "./src/redux/store";
import { PaperProvider } from "react-native-paper";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const fontsLoaded = useAppFonts();



  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PaperProvider>
          <Navigation />
      </PaperProvider> 
    </Provider>
  );
}