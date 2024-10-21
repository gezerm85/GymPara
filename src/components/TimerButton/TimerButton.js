import { StyleSheet, Pressable, Image } from 'react-native'
import React from 'react'
import whistle from '../../assets/images/BottomNav/whistle.png'
import { colors } from '../../utils/Colors/Color'

const TimerButton = ({onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image style={styles.image} source={whistle} />
    </Pressable>
  )
}

export default TimerButton

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        width: 48,
        height: 42,
        marginVertical: 0,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: colors.MainColor,
        marginVertical: 11,
    },
    image:{
        width: 26,
        height: 26,
        resizeMode: 'contain',
    },
})