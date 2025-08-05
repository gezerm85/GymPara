import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { colors } from '../../utils/Colors/Color'
import { API_IMAGE_BASE_URL } from '@env';
import Icon from "react-native-vector-icons/Ionicons";

const IMAGE_BASE_URL = API_IMAGE_BASE_URL || 'http://10.0.2.2:5000';

const HeaderProfile = () => {
  const navigation = useNavigation();
  const { profile } = useSelector((state) => state.user);

  const handleProfilePress = () => {
    try {
      // Nested navigation - Home tab'ından ProfileScreen'e git
      navigation.navigate("Home", { screen: "ProfileScreen" });
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <TouchableOpacity onPress={handleProfilePress} style={styles.container}>
      {profile?.profile_image_url ? (
        <Image
          source={{ uri: `${IMAGE_BASE_URL}${profile.profile_image_url}` }}
          style={styles.profileImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.defaultProfileImage}>
          <Icon name="person" size={20} color="#ccc" />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default HeaderProfile;

const styles = StyleSheet.create({
  container: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 16,
    backgroundColor: "#f0f0f0",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 18,
  },
  defaultProfileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e0e0e0",
  },
});
