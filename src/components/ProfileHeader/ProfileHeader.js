import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';

const ProfileHeader = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    console.log('Geri butonuna tıklandı')
    // MainStack içinde HomeScreen'e geri git
    navigation.navigate('HomeScreen')
  };

  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon name="arrow-left" size={20} color="#333" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.centerContainer}>
        <Text style={styles.title}>Profil</Text>
      </View>
      
      <View style={styles.rightContainer}>
        {/* Boş alan */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    height: 80,
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerContainer: {
    flex: 2,
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

export default ProfileHeader; 