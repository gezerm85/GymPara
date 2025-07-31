// CustomBottomTabNavigator.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomBottomTabNavigator = ({ state }) => {
  const navigation = useNavigation();

  const navigateToScreen = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.tabButton} 
        onPress={() => navigateToScreen('Home')}
      >
        <Text style={styles.tabText}>Anasayfa</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tabButton} 
        onPress={() => navigateToScreen('AnalysisScreen')}
      >
        <Text style={styles.tabText}>Analizler</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tabButton} 
        onPress={() => navigateToScreen('ExercisePickerModal')}
      >
        <Text style={styles.tabText}>Zamanlayıcı</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tabButton} 
        onPress={() => navigateToScreen('StoreScreen')}
      >
        <Text style={styles.tabText}>Mağaza</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tabButton} 
        onPress={() => navigateToScreen('GiftScreen')}
      >
        <Text style={styles.tabText}>Bonuslar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 65,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  tabText: {
    fontSize: 12,
    fontFamily: 'Regular',
  },
});

export default CustomBottomTabNavigator;
