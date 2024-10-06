import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Image } from "expo-image";


const TabBarIcon = ({ focused, activeIcon, inactiveIcon }) => {
  return (
    <View style={styles.container}>
    <Image style={styles.image} source={focused ? activeIcon : inactiveIcon} />
  </View>
  )
}

export default TabBarIcon

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center'
    },
    image: {
        width: 20,
        height: 20,
      },
})