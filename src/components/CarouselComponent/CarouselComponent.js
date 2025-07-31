import { StyleSheet, Text, View, Dimensions, Image, ActivityIndicator, Button } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Carousel from 'react-native-reanimated-carousel'
import { fetchCarouselData } from '../../redux/carouselSlice'

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
      <View style={[
        styles.carouselItem, 
        { backgroundColor: item.img ? 'transparent' : item.color }
      ]}>
        {item.img ? (
          <Image 
            source={{ uri: item.img }} 
            style={styles.carouselImage}
            resizeMode="cover"
          />
        ) : null}
        <View style={styles.carouselContent}>
          <Text style={styles.carouselTitle}>{item.title}</Text>
          <Text style={styles.carouselDescription}>{item.description}</Text>
        </View>
      </View>
    )
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
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
      width={screenWidth}
      height={200}
      autoPlay={true}
      data={carouselData}
      scrollAnimationDuration={1000}
      autoPlayInterval={3000}
      renderItem={renderCarouselItem}
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 70,
      }}
    />
  )
}

export default CarouselComponent

const styles = StyleSheet.create({
  loadingContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginBottom: 10,
  },
  carouselItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  carouselImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%', 
    height: '100%',  
  },
  carouselContent: {
    position: 'relative',
    zIndex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  carouselTitle: {
    fontSize: 24,   
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  carouselDescription: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
    fontFamily: 'Medium',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
})