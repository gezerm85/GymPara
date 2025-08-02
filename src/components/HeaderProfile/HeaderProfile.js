import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import profile from '../../assets/images/Profile.png'
import { useNavigation } from '@react-navigation/native'

const HeaderProfile = () => {
  const nav = useNavigation()
  
  const handleProfilePress = () => {
    console.log('Profile butonuna tıklandı')
    // MainStack içindeki ProfileScreen'e git
    nav.navigate('ProfileScreen')
  }

  return (
    <TouchableOpacity onPress={handleProfilePress} style={styles.container}>
      <Image style={styles.image} source={profile} />
    </TouchableOpacity>
  )
}

export default HeaderProfile

const styles = StyleSheet.create({
    container: {
        width: 36, 
        height: 36,
        borderRadius: 27.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 16,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 27.5, 
        resizeMode: 'cover',
    },
})