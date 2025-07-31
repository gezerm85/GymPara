import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderProfile from '../HeaderProfile/HeaderProfile';
import ScoreComp from '../ScoreComp/ScoreComp';
import { colors } from '../../utils/Colors/Color';

const CustomHeader = ({ title, showProfile = true, showScore = true }) => {
  return (
    <View style={styles.header}>
      {showProfile && (
        <View style={styles.leftContainer}>
          <HeaderProfile />
        </View>
      )}
      
      <View style={styles.centerContainer}>
        {title === "GYMPARA" ? (
          <Text style={styles.title}>GYM<Text style={styles.title2}>PARA</Text></Text>
        ) : (
          <Text style={styles.title}>{title}</Text>
        )}
      </View>
      
      {showScore && (
        <View style={styles.rightContainer}>
          <ScoreComp />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginVertical: 24,

  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerContainer: {
    flex: 2,
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  title2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.MainColor,
    textAlign: 'center',
    fontFamily: 'Bold',
  },
});

export default CustomHeader; 