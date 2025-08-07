import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../redux/authSlice";
import { navigationRef } from '../../../router/Navigation/navigationUtils';
import { CommonActions } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Icon from "react-native-vector-icons/Ionicons";
import ProfileHeader from "../../../components/ProfileHeader/ProfileHeader";
import { API_IMAGE_BASE_URL } from '@env';

const IMAGE_BASE_URL = API_IMAGE_BASE_URL || 'http://10.0.2.2:5000';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { profile, loading, error, uploadLoading, uploadError } = useSelector((state) => state.user);






  const handleLogout = async () => {
    Alert.alert(
      "Çıkış Yap",
      "Çıkış yapmak istediğinizden emin misiniz?",
      [
        { text: "İptal", style: "cancel" },
        {
          text: "Çıkış Yap",
          style: "destructive",
          onPress: async () => {
            try {
              await dispatch(logoutUser());
              
              // Login ekranına yönlendir
              if (navigationRef.isReady()) {
                navigationRef.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [
                      { name: 'LoginScreen' }
                    ],
                  })
                );
              }
            } catch (error) {
              console.error('Logout hatası:', error);
            }
          }
        }
      ]
    );
  };

  const handleImageUpload = async () => {
    try {
      // İzinleri kontrol et
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('İzin Gerekli', 'Fotoğraf seçmek için galeri izni gereklidir.');
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
        // Mock - fotoğraf yükleme başarılı
        Alert.alert('Başarılı', 'Profil fotoğrafı güncellendi!');
      }
    } catch (error) {
      console.error('Fotoğraf yükleme hatası:', error);
      Alert.alert('Hata', 'Fotoğraf yüklenirken bir hata oluştu.');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ProfileHeader />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
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
          <TouchableOpacity onPress={handleImageUpload} disabled={uploadLoading}>
            {profile?.profile_image_url ? (
              <Image 
                source={{ uri: `${IMAGE_BASE_URL}${profile.profile_image_url}` }}
                style={styles.profileImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.defaultProfileImage}>
                <Icon name="person" size={40} color="#ccc" />
              </View>
            )}
            
            {/* Yükleme göstergesi */}
            {uploadLoading && (
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
          <Text style={styles.info}>{profile?.name || "Belirtilmemiş"}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>E-posta:</Text>
          <Text style={styles.info}>{profile?.email || "Belirtilmemiş"}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Cinsiyet:</Text>
          <Text style={styles.info}>{profile?.gender || "Belirtilmemiş"}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Doğum Yılı:</Text>
          <Text style={styles.info}>{profile?.birth_year || "-"}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Aktivite Seviyesi:</Text>
          <Text style={styles.info}>{profile?.activity_level || "Belirtilmemiş"}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Motivasyon:</Text>
          <Text style={styles.info}>{profile?.motivation || "Belirtilmemiş"}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Kilo:</Text>
          <Text style={styles.info}>{profile?.weight ? `${profile.weight} kg` : "Belirtilmemiş"}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Boy:</Text>
          <Text style={styles.info}>{profile?.height ? `${profile.height} cm` : "Belirtilmemiş"}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Egzersiz Günleri:</Text>
          <Text style={styles.info}>{profile?.workout_days?.join(', ') || "Belirtilmemiş"}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Puan:</Text>
          <Text style={styles.info}>{profile?.point || 0} GP</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="log-out" size={24} color="#fff" />
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
    borderColor: "#007bff", // Changed from colors.MainColor to a specific color
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
    backgroundColor: "#007bff", // Changed from colors.MainColor to a specific color
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
