import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeStack from "../WelcomeStack/WelcomeStack";
import MainBottomTabs from "../MainBottomTabs/MainBottomTabs";
import { useSelector } from "react-redux";

const Navigation = () => {
  const { isAuth } = useSelector((e) => e.main);

  return (
    <NavigationContainer>
      {isAuth == false ? <WelcomeStack /> : <MainBottomTabs />}
    </NavigationContainer>
  );
};

export default Navigation;
