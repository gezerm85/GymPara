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
import { loginUser, clearError } from "../../../redux/authSlice";
import { loadUserData } from "../../../redux/dataSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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
              { name: 'MainBottomTabs' }
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

  const handleLogin = async () => {
    if (!validateInputs()) return;
    
    try {
      // Remember me işlemi
      if (rememberMe) {
        await AsyncStorage.setItem('rememberMe', 'true');
        await AsyncStorage.setItem('rememberedEmail', email);
        await AsyncStorage.setItem('rememberedPassword', password);
      } else {
        await AsyncStorage.removeItem('rememberMe');
        await AsyncStorage.removeItem('rememberedEmail');
        await AsyncStorage.removeItem('rememberedPassword');
      }

      // Login işlemi
      await dispatch(loginUser({ email, password }));
      
    } catch (error) {
      console.error('Login hatası:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Giriş Yap</Text>
          <Text style={styles.subtitle}>Hoş geldin! Lütfen hesabına giriş yap.</Text>
        </View>
        <View style={styles.form}>
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
              <Icon
                name={showPassword ? "eye-off" : "eye"}
                size={22}
                color="#007BFF"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.rememberMeRow}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[styles.checkboxBox, rememberMe && styles.checkboxBoxChecked]}>
                {rememberMe && <Icon name="checkmark" size={16} color="#fff" />}
              </View>
            </TouchableOpacity>
            <Text style={styles.rememberMeLabel} onPress={() => setRememberMe(!rememberMe)}>
              Beni Hatırla
            </Text>
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Giriş Yap</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate("RegisterScreen")}
            disabled={loading}
          >
            <Text style={styles.registerButtonText}>Hesabın yok mu? Kayıt Ol</Text>
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
  iconButton: {
    marginLeft: -40,
    padding: 8,
  },
  loginButton: {
    height: 52,
    backgroundColor: "#007BFF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerButton: {
    alignItems: "center",
    paddingVertical: 10,
  },
  registerButtonText: {
    color: "#007BFF",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  rememberMeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxBox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxBoxChecked: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  rememberMeLabel: {
    fontSize: 15,
    color: '#222',
  },
});

export default LoginScreen;
