import React,{useEffect} from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../../firebase/firebaseConfig";
import { signOut } from "firebase/auth"; // Firebase Authentication için çıkış fonksiyonu
import { useNavigation, CommonActions } from "@react-navigation/native";
import { loadUserData } from "../../../redux/dataSlice";
import ProfileHeader from "../../../components/ProfileHeader/ProfileHeader";

const ProfileScreen = () => {
  const { userData } = useSelector((state) => state.data);

  const navigation = useNavigation()

  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      const user = auth.currentUser;
      const parentNavigation = navigation.getParent();
  
      if (user) {
        await signOut(auth); // Kullanıcının oturumunu kapat
      }
  
      // Tüm kullanıcı verilerini temizle
      dispatch(loadUserData({})); // Redux state'ini sıfırla
  
      console.log("Başarıyla çıkış yapıldı.");
  
      // Kullanıcıyı WelcomeStack içindeki LoginScreen'e yönlendir
      parentNavigation.reset({
        index: 0,
        routes: [{ name: "Welcome", params: { screen: "LoginScreen" } }],
      });
  
    } catch (error) {
      console.error("Çıkış yapma hatası:", error);
    }
  };
  

  return (
    <View style={styles.container}>
      <ProfileHeader />
      <View style={styles.profileContainer}>
        <Text style={styles.title}>Profil</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Cinsiyet: {userData?.fullName}</Text>
          <Text style={styles.info}>{userData?.gender || "Belirtilmemiş"}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Doğum Yılı:</Text>
          <Text style={styles.info}>{userData?.year || "-"}</Text>
        </View>
        {/* Diğer kullanıcı bilgilerini buraya ekleyebilirsin */}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="logout" size={24} color="#fff" />
        <Text style={styles.logoutText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  profileContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    width: 120,
  },
  info: {
    fontSize: 16,
    flex: 1,
  },
  logoutButton: {
    backgroundColor: "#ff4444",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 8,
    margin: 20,
    gap: 10,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
