import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const sports = [
  { id: '1', name: 'Basketbol', icon: 'basketball' },
  { id: '2', name: 'Bisiklet', icon: 'bike' },
  { id: '3', name: 'Tenis', icon: 'tennis' },
  { id: '4', name: 'Futbol', icon: 'soccer' },
  { id: '5', name: 'Voleybol', icon: 'volleyball' },
];

const SportSelection= () => {
  const [selectedSport, setSelectedSport] = useState(sports[0]);
  const scale = useSharedValue(1);

  const selectSport = (sport) => {
    scale.value = withTiming(1.2, { duration: 200 }, () => {
      setSelectedSport(sport);
      scale.value = withTiming(1, { duration: 200 });
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => selectSport(item)} style={styles.iconWrapper}>
      <Animated.View style={[item.id === selectedSport.id ? animatedStyle : null]}>
        <Icon name={item.icon} size={30} color={item.id === selectedSport.id ? '#007bff' : '#fff'} />
      </Animated.View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="close" size={30} color="#9e9e9e" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Spor branşınızı seçin?</Text>
      </View>

      <View style={styles.centerContent}>
        <Text style={styles.selectedSportText}>{selectedSport.name}</Text>
      </View>

      <View style={styles.footer}>
        <FlatList
          data={sports}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startButtonText}>Spora Başla</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default  SportSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 40,
  },
  headerText: {
    fontSize: 18,
    color: '#fff',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedSportText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
  },
  footer: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  iconWrapper: {
    marginHorizontal: 10,
  },
  startButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  startButtonText: {
    color: '#007bff',
    fontSize: 16,
  },
});