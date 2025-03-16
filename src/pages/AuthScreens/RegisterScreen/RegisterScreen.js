import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { register } from "../../../firebase/firebaseAuth";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { setDoc, doc } from "firebase/firestore";
import { firestoreDB } from "../../../firebase/firebaseConfig";

const RegisterScreen = () => {
  const navigation = useNavigation();

  const { userData } = useSelector((state) => state.data);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Kullanıcı kayıt işlemi
  const handleRegister = async () => {
    if (!validateInputs()) return;

    try {
      const user = await register(email, password, fullName);
      Alert.alert("Kayıt Başarılı", `Hoş geldin, ${user.email}!`);
      // Kayıt olduktan sonra direkt Login sayfasına yönlendir
      navigation.navigate("LoginScreen");
      await setDoc(doc(firestoreDB, "users", user.uid), {
        userInformation:{
          ...userData,
        },
        firstTimeLogin: false, 
  
      }, { merge: true });
    } catch (error) {
      handleAuthError(error);
    }
  };

  // Form doğrulama
  const validateInputs = () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert("Uyarı", "Lütfen tüm alanları doldurun.");
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert("Hata", "Şifreler eşleşmiyor.");
      return false;
    }
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Uyarı", "Lütfen geçerli bir e-posta giriniz.");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("Uyarı", "Şifre en az 6 karakter olmalıdır.");
      return false;
    }
    return true;
  };

  // Firebase hata mesajlarını yönet
  const handleAuthError = (error) => {
    console.error("Kayıt Hatası:", error);
    let message = error.message || "Bilinmeyen bir hata oluştu.";
    if (error.code) {
      switch (error.code) {
        case "auth/email-already-in-use":
          message = "Bu e-posta zaten kullanılıyor.";
          break;
        case "auth/invalid-email":
          message = "Geçersiz e-posta adresi.";
          break;
        case "auth/weak-password":
          message = "Şifre en az 6 karakter olmalıdır.";
          break;
        default:
          message = `Firebase Hatası: ${error.message}`;
      }
    }
    Alert.alert("Kayıt Hatası", message);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Kayıt Ol</Text>
        
        <TextInput
          style={styles.input}
          placeholder="İsim Soyisim"
          placeholderTextColor="#aaa"
          value={fullName}
          onChangeText={setFullName}
        />
        
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
            <Icon name={showPassword ? "eye-off" : "eye"} size={20} color="#007BFF" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Şifre Onay"
            placeholderTextColor="#aaa"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.iconButton}
          >
            <Icon name={showConfirmPassword ? "eye-off" : "eye"} size={20} color="#007BFF" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={styles.loginButtonText}>Giriş Yap</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.guestButton}
          onPress={() => navigation.navigate("Gender")}
        >
          <Text style={styles.guestButtonText}>Misafir Olarak Devam Et</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  formContainer: { 
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  passwordInput: {
    flex: 1,
    paddingRight: 60, // Icon için alan bırak
  },
  iconButton: {
    position: "absolute",
    right: 15,
    bottom: 28,
  },
  registerButton: {
    backgroundColor: "#007BFF",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomContainer: { 
    paddingHorizontal: 16, 
    marginBottom: 20,
    alignItems: "center",
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#717171",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 16,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  guestButton: {
    paddingVertical: 15,
    alignItems: "center",
  },
  guestButtonText: {
    fontSize: 16,
    color: "#007BFF",
    textDecorationLine: "underline",
  },
});
