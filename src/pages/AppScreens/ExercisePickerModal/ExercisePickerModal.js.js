import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import TopTabsNavigator from '../../../router/TopTabsNavigator/TopTabsNavigator';
import Icon from 'react-native-vector-icons/FontAwesome6'; 
import CustomHeader from '../../../components/CustomHeader/CustomHeader';

const ExercisePickerModal = () => {
  const [search, setSearch] = useState("");

  const handleSearchPress = () => {
    Keyboard.dismiss(); // Klavyeyi kapat
    // İstersen burada başka bir arama işlemi de tetikleyebilirsin
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Egzersiz Seç" />
      <View style={styles.bodyContainer}>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.search}
            placeholder='Spor Branşlarında Arat'
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
            onSubmitEditing={handleSearchPress}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
            <Icon name='magnifying-glass' color={"#fff"} size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <TopTabsNavigator search={search} />
      </View>
    </View>
  )
}

export default ExercisePickerModal

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
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 16,
    gap: 8,
  },
  search:{
    flex: 1,
    height: '100%',
    fontSize: 16,
    backgroundColor: 'transparent',
    paddingRight: 8,
  },
  searchButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  bottomContainer:{
    flex:5,
  }
})