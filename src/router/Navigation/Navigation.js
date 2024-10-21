import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeStack from "../WelcomeStack/WelcomeStack";
import MainBottomTabs from "../MainBottomTabs/MainBottomTabs";
import { useSelector, useDispatch } from "react-redux";
import { loadUserData } from "../../redux/dataSlice";

const Navigation = () => {
  const { isAuth } = useSelector((e) => e.main);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserData())
  }, [dispatch]);

  return (
    <NavigationContainer>
      {isAuth == false ? <WelcomeStack /> : <MainBottomTabs />}
    </NavigationContainer>
  );
};

export default Navigation;
