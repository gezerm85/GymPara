import { StyleSheet, Text, View, Pressable, } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';


const LoginButton = ({ title , vector, onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image style={styles.img} source={vector} />
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default LoginButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
    justifyContent: 'center'
  },
  img: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Medium',
    color: '#000',
    textAlign: 'left'
  },
});
