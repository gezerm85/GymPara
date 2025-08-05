import { StyleSheet, Text, View, Dimensions, Image, ActivityIndicator, Button, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Carousel from 'react-native-reanimated-carousel'
import { fetchCarouselData } from '../../redux/carouselSlice'
import Icon from 'react-native-vector-icons/Ionicons'

const { width: screenWidth } = Dimensions.get('window')

const CarouselComponent = () => {
  const dispatch = useDispatch()
  
  // Redux'tan carousel verilerini al
  const { items: carouselData, loading, error } = useSelector((state) => state.carousel)

  // Component mount olduğunda carousel verilerini çek
  useEffect(() => {
    dispatch(fetchCarouselData())
  }, [dispatch])

  const renderCarouselItem = ({ item, index }) => {
    return (
      <View style={styles.carouselItem}>
        {/* Kırmızı arka plan */}
        <View style={styles.bodyContainer}>
          {/* Sol taraf - Metin içeriği */}
          <View style={styles.textContainer}>
            <Text style={styles.mainTitle}>GÜNLÜK BONUS</Text>
            <View style={styles.bonusTextContainer}>
              <Text style={styles.bonusText}>İLE </Text>
              <Text style={styles.bonusAmount}>300GP</Text>
              <Text style={styles.bonusText}> CEBİNDE</Text>
            </View>
            <TouchableOpacity style={styles.bonusLink}>
              <Text style={styles.linkText}>Tüm Bonusları</Text>
              <Icon name="chevron-forward" size={16} color="#4A90E2" />
            </TouchableOpacity>
          </View>
          
          {/* Sağ taraf - 3D ikon alanı */}
          <View style={styles.iconContainer}>
            <View style={styles.bottleIcon}>
              <View style={styles.bottleCap} />
              <View style={styles.bottleBody}>
                <View style={styles.lightningBolt}>
                  <Icon name="flash" size={24} color="#1E3A8A" />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF4444" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateText}>Carousel verileri yüklenemedi. Tekrar deneyin.</Text>
        <Button title="Tekrar Dene" onPress={() => dispatch(fetchCarouselData())} />
      </View>
    )
  }

  if (carouselData.length === 0) {
    return (
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateText}>Carousel verisi bulunamadı.</Text>
      </View>
    )
  }

  return (
    <Carousel
      loop
      width={screenWidth - 32}
      height={169}
      autoPlay={true}
      data={carouselData}
      scrollAnimationDuration={1000}
      autoPlayInterval={4000}
      renderItem={renderCarouselItem}
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 1,
        parallaxScrollingOffset: 50,
        parallaxAdjacentItemScale: 0.8,
      }}
    />
  )
}

export default CarouselComponent

const styles = StyleSheet.create({
  loadingContainer: {
    height: 169,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateContainer: {
    height: 169,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  carouselItem: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 20,
    position: 'relative',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 20,
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F2F2F',
    marginBottom: 8,
    fontFamily: 'Bold',
  },
  bonusTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bonusText: {
    fontSize: 16,
    color: '#2F2F2F',
    fontFamily: 'Medium',
  },
  bonusAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0166FF',
    fontFamily: 'Bold',
  },
  bonusLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
    color: '#4A90E2',
    fontFamily: 'Medium',
    marginRight: 4,
  },
  iconContainer: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottleIcon: {
    width: 50,
    height: 70,
    alignItems: 'center',
  },
  bottleCap: {
    width: 30,
    height: 15,
    backgroundColor: '#2F2F2F',
    borderRadius: 15,
    marginBottom: 2,
  },
  bottleBody: {
    width: 40,
    height: 50,
    backgroundColor: '#1E3A8A',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  lightningBolt: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})