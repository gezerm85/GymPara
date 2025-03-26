import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import TopTabsNavigator from '../../../router/TopTabsNavigator/TopTabsNavigator'
import Icon from 'react-native-vector-icons/FontAwesome6'; 

const TimerScreen = () => {
  return (
    <View style={styles.container}>
     <View style={styles.bodyContainer}>
      <View style={styles.searchBox}>
        <Icon name='magnifying-glass' color={"#4F4F4F"} size={24} />
        <TextInput style={styles.search}
         placeholder='Spor Branşlarında Arat' />
         
      </View>
     </View>
      <View style={styles.bottomContainer}>
      <TopTabsNavigator/>
      </View>
    </View>
  )
}

export default TimerScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff'
  },
  bodyContainer:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  searchBox:{
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    width: '100%',
    height: 56,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 16,
    gap: 16,
  },
  search:{
    width: '85%',
    height: '100%',
  },
  bottomContainer:{
    flex:5,
  }
})