import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { loadUserData } from "../../../redux/dataSlice";
import { logoutUser, getUserProfile, uploadProfileImage } from "../../../services/apiAuth";
import ProfileHeader from "../../../components/ProfileHeader/ProfileHeader";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from "../../../utils/Colors/Color";
import { navigationRef } from '../../../router/Navigation/navigationUtils';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
  const { userData } = useSelector((state) => state.data);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Profil bilgilerini API'den al
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const result = await getUserProfile();
        console.log('Profil bilgileri:', result);
        setProfileData(result);
      } catch (error) {
        console.error('Profil bilgileri alınamadı:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // Fotoğraf seçme ve yükleme
  const handleImageUpload = async () => {
    try {
      // İzin iste
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('İzin Gerekli', 'Fotoğraf galerisine erişim izni gereklidir.');
        return;
      }

      // Fotoğraf seç
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setUploading(true);
        
        // Fotoğrafı yükle
        const uploadResult = await uploadProfileImage(result.assets[0].uri);
        
        // Profil bilgilerini yeniden yükle
        const updatedProfile = await getUserProfile();
        setProfileData(updatedProfile);
        
        Alert.alert('Başarılı', 'Profil fotoğrafı güncellendi!');
      }
    } catch (error) {
      console.error('Fotoğraf yükleme hatası:', error);
      Alert.alert('Hata', 'Fotoğraf yüklenirken bir hata oluştu.');
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    try {
      console.log('Çıkış yapılıyor...');
      
      // API'ye logout isteği gönder
      await logoutUser();
      
      // Redux state'i temizle
      dispatch(loadUserData({}));
      
      console.log("✅ Başarıyla çıkış yapıldı.");
      
      // Kullanıcıyı WelcomeStack içindeki LoginScreen'e yönlendir
      if (navigationRef.isReady()) {
        navigationRef.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Welcome", params: { screen: "LoginScreen" } }],
          })
        );
      }
  
    } catch (error) {
      console.error("Çıkış yapma hatası:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ProfileHeader />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.MainColor} />
          <Text style={styles.loadingText}>Profil bilgileri yükleniyor...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ProfileHeader />
      <View style={styles.profileContainer}>
        <Text style={styles.title}>Profil</Text>
        
        {/* Profil Resmi */}
        <View style={styles.profileImageContainer}>
          <TouchableOpacity onPress={handleImageUpload} disabled={uploading}>
            {profileData?.profile_image_url ? (
              <Image 
                source={{ uri: `http://10.0.2.2:5000${profileData.profile_image_url}` }}
                style={styles.profileImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.defaultProfileImage}>
                <Icon name="account" size={40} color="#ccc" />
              </View>
            )}
            
            {/* Yükleme göstergesi */}
            {uploading && (
              <View style={styles.uploadOverlay}>
                <ActivityIndicator size="small" color="#fff" />
              </View>
            )}
            
            {/* Kamera ikonu */}
            <View style={styles.cameraIcon}>
              <Icon name="camera" size={16} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>İsim:</Text>
          <Text style={styles.info}>{profileData?.name || "Belirtilmemiş"}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>E-posta:</Text>
          <Text style={styles.info}>{profileData?.email || "Belirtilmemiş"}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Cinsiyet:</Text>
          <Text style={styles.info}>{profileData?.gender || "Belirtilmemiş"}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Doğum Yılı:</Text>
          <Text style={styles.info}>{profileData?.birth_year || "-"}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Aktivite Seviyesi:</Text>
          <Text style={styles.info}>{profileData?.activity_level || "Belirtilmemiş"}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Motivasyon:</Text>
          <Text style={styles.info}>{profileData?.motivation || "Belirtilmemiş"}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Kilo:</Text>
          <Text style={styles.info}>{profileData?.weight ? `${profileData.weight} kg` : "Belirtilmemiş"}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Boy:</Text>
          <Text style={styles.info}>{profileData?.height ? `${profileData.height} cm` : "Belirtilmemiş"}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Egzersiz Günleri:</Text>
          <Text style={styles.info}>{profileData?.workout_days?.join(', ') || "Belirtilmemiş"}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Puan:</Text>
          <Text style={styles.info}>{profileData?.point || 0} GP</Text>
        </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
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
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.MainColor,
  },
  defaultProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.MainColor,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
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
