import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const StoreDetailScreen = () => {
    const {item} = useRoute().params
    console.log(item);
    
  return (
    <View>
        <Image source={item.img}/>
      <Text>{item.title}</Text>
    </View>
  )
}

export default StoreDetailScreen

const styles = StyleSheet.create({})