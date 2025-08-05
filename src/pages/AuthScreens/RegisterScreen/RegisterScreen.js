import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { navigationRef } from '../../../router/Navigation/navigationUtils';
import { CommonActions } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser, clearError } from "../../../redux/authSlice";
import { loadUserData } from "../../../redux/dataSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Auth durumunu izle
  useEffect(() => {
    if (isAuthenticated) {
      // Kullanıcı verilerini Redux'a yükle
      dispatch(loadUserData());
      
      // Navigation'ı yeniden başlat
      if (navigationRef.isReady()) {
        navigationRef.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Welcome' }
            ],
          })
        );
      }
    }
  }, [isAuthenticated, dispatch]);

  // Hata mesajını göster
  useEffect(() => {
    if (error) {
      Alert.alert("Hata", error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const validateInputs = () => {
    if (!name.trim()) {
      Alert.alert("Uyarı", "Lütfen adınızı giriniz.");
      return false;
    }
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
    if (password !== confirmPassword) {
      Alert.alert("Uyarı", "Şifreler eşleşmiyor.");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateInputs()) return;
    
    try {
      // Önce kayıt ol
      await dispatch(registerUser({ name, email, password }));
      
      // Sonra otomatik giriş yap
      await dispatch(loginUser({ email, password }));
      
    } catch (error) {
      console.error('Register hatası:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Kayıt Ol</Text>
          <Text style={styles.subtitle}>Hemen kaydol, kişisel planını oluştur!</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="İsim Soyisim"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder="E-posta"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <View style={styles.passwordContainerRelative}>
            <TextInput
              style={[styles.input, styles.inputWithIcon]}
              placeholder="Şifre"
              placeholderTextColor="#aaa"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.iconButtonAbsolute}
            >
              <Icon name={showPassword ? "eye-off" : "eye"} size={22} color="#007BFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.passwordContainerRelative}>
            <TextInput
              style={[styles.input, styles.inputWithIcon]}
              placeholder="Şifre Onay"
              placeholderTextColor="#aaa"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.iconButtonAbsolute}
            >
              <Icon name={showConfirmPassword ? "eye-off" : "eye"} size={22} color="#007BFF" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.registerButtonText}>Kayıt Ol</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("LoginScreen")}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>Zaten hesabın var mı? Giriş Yap</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 60,
    marginBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#222",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
  },
  form: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 18,
    fontSize: 16,
    backgroundColor: "#fafbfc",
    color: "#222",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  passwordContainerRelative: {
    position: 'relative',
    marginBottom: 18,
  },
  inputWithIcon: {
    paddingRight: 44,
  },
  iconButtonAbsolute: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  registerButton: {
    height: 52,
    backgroundColor: "#007BFF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginButton: {
    alignItems: "center",
    paddingVertical: 10,
  },
  loginButtonText: {
    color: "#007BFF",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default RegisterScreen;
