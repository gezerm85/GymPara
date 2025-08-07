import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome6'
import { colors } from '../../utils/Colors/Color'
import leaderboard from '../../assets/images/leaderboard.png'
import madalya from '../../assets/images/madalya.png'


const LeaderboardComponent = () => {
  return (
    <View style={styles.container}>
       <View style={styles.headerContainer}>
        <Text style={styles.headerText}>🔥 Liderlik <Text style={styles.headerText2}>Tablosu</Text></Text>
        <Icon name="angle-right" size={18} color={colors.MainColor} />
        </View>
        <View style={styles.bodyContainer}>  
            <View style={styles.imageContainer}>
                <Image source={leaderboard} style={styles.image} />
                <Text style={styles.imageText}>Leaderboard</Text>
            </View>
            <View style={styles.imageContainer}>
                <Text style={styles.madalyaText}>
                10.000
                    <Text style={styles.madalyaText2}> GP</Text>
                </Text>
                <Image source={madalya} style={styles.madalyaImage} />
            </View>
        </View>
    </View> 
  )
}

export default LeaderboardComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    gap: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bodyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
  },
  headerText2: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.MainColor,
  },
  imageContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  image: {
    width: 24,
    height: 24,
  },
  madalyaImage: {
    width: 22,
    height: 22,
  },
  madalyaText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.MainColor,
  },
  madalyaText2: {
    fontSize: 8,
    fontWeight: '600',
    color: '#000000',
  },
})