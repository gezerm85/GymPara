import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { signIn } from "../../../firebase/firebaseAuth";
import Icon from "react-native-vector-icons/Ionicons";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 🔹 Giriş bilgilerini doğrula
  const validateInputs = () => {
    if (!email.trim()) {
      Alert.alert("Uyarı", "Lütfen e-posta adresinizi giriniz.");
      return false;
    }
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Uyarı", "Lütfen geçerli bir e-posta adresi giriniz.");
      return false;
    }
    if (!password.trim()) {
      Alert.alert("Uyarı", "Lütfen şifrenizi giriniz.");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("Uyarı", "Şifreniz en az 6 karakter olmalıdır.");
      return false;
    }
    return true;
  };

  // 🔹 Kullanıcı giriş işlemi
  const handleLogin = async () => {
    if (!validateInputs()) return; // Validasyon başarısızsa işlemi durdur

    try {
      const user = await signIn(email, password);
      if (user) {
        console.log("✅ Giriş başarılı, kullanıcı bilgileri alındı.");
        navigation.navigate("Gender");

        // 🔹 "Beni Hatırla" ayarları
        if (rememberMe) {
          await AsyncStorage.setItem("isRememberMe", "true");
          await AsyncStorage.setItem("rememberedEmail", email);
          await AsyncStorage.setItem("rememberedPassword", password);
        } else {
          await AsyncStorage.setItem("isRememberMe", "false");
          await AsyncStorage.removeItem("rememberedEmail");
          await AsyncStorage.removeItem("rememberedPassword");
        }
      }
    } catch (error) {
      console.error("❌ Giriş hatası:", error);
      Alert.alert("Hata", "Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo Alanı */}
      <View style={styles.bodyContainer}>
        <Text style={styles.logoText}>Logo Alanı</Text>
      </View>

      {/* Giriş Formu */}
      <View style={styles.bottomContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-posta"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Şifre"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconButton}
          >
            <Icon
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="#007BFF"
            />
          </TouchableOpacity>
        </View>

        {/* Beni Hatırla */}
        <View style={styles.rememberContainer}>
          <Switch value={rememberMe} onValueChange={setRememberMe} />
          <Text style={styles.rememberText}>Beni Hatırla</Text>
        </View>

        {/* Giriş Butonu */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Giriş Yap</Text>
        </TouchableOpacity>

        {/* Kayıt Ol Butonu */}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate("RegisterScreen")}
        >
          <Text style={styles.registerButtonText}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  bodyContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  bottomContainer: {
    width: "100%",
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#000",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  passwordInput: {
    flex: 1,
    paddingRight: 60,
  },
  iconButton: {
    position: "absolute",
    right: 15,
    bottom: 29,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  rememberText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#808182",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 10,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
