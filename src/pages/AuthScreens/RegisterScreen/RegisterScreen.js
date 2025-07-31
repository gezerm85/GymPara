import React, { useState } from "react";
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
import { register, signIn } from "../../../firebase/firebaseAuth";
import Icon from "react-native-vector-icons/Ionicons";
import { navigationRef } from '../../../router/Navigation/navigationUtils';
import { CommonActions } from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleRegister = async () => {
    if (!validateInputs()) return;
    setLoading(true);
    try {
      await register(email, password, fullName);
      // Kayıt başarılı, otomatik giriş yap
      await signIn(email, password);
      if (navigationRef.isReady()) {
        navigationRef.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Welcome', params: { screen: 'Gender' } }
            ],
          })
        );
      }
    } catch (error) {
      Alert.alert("Kayıt Hatası", error.message || "Kayıt sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
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
            value={fullName}
            onChangeText={setFullName}
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
