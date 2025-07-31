import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import img from '../../assets/images/BottomNav/whistle.png'
import { colors } from '../../utils/Colors/Color'

const MainButton = () => {
  return (
    <View style={styles.container}>
     <Image style={styles.image} source={img}/>
    </View>
  )
}

export default MainButton

const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.MainColor,
    borderRadius: 14,
    width: 48,
    height: 42,
  },
  image:{
    width: 24,
    height: 24,
    resizeMode: 'contain'
  }
})