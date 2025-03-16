import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { loadUserData } from "../redux/dataSlice"; // Kullanıcı verisini Redux'tan çekiyoruz

const AutoLogin = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadUserData()); // Kullanıcı verisini Redux'tan yükle
  }, [dispatch]);

  useEffect(() => {
    if (userData && userData.firstTimeLogin) {
      console.log("✅ Kullanıcı giriş yapmış, Home'a yönlendiriliyor...");
      navigation.reset({
        index: 0,
        routes: [{ name: "MainBottomTabs" }],
      });
    } else {
      console.log("🚫 Kullanıcı giriş yapmamış, Login ekranında kalıyor.");
    }
  }, [userData, navigation]);

  return null; // UI render edilmesine gerek yok, sadece yönlendirme yapıyoruz
};

export default AutoLogin;
