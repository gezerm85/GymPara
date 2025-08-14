import { StyleSheet, Text, View, Dimensions, Image, ActivityIndicator, Button } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Carousel from "react-native-reanimated-carousel";
import { API_IMAGE_BASE_URL } from '@env';

const { width: screenWidth } = Dimensions.get("window");

const IMAGE_BASE_URL = API_IMAGE_BASE_URL || 'http://10.0.2.2:5000';

const CarouselComponent = () => {
  const { items: carouselData, loading, error } = useSelector((state) => state.carousel);
  const [activeIndex, setActiveIndex] = useState(0);

  const renderCarouselItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Image
          source={{ uri: `${IMAGE_BASE_URL}${item.img_url}` }}
          style={styles.carouselImage}
          resizeMode="cover"
        />
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateText}>Carousel verileri yüklenemedi. Tekrar deneyin.</Text>
        <Button title="Tekrar Dene" onPress={() => dispatch(fetchCarouselData())} />
      </View>
    );
  }

  if (!carouselData?.length) {
    return (
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateText}>Carousel verisi bulunamadı.</Text>
      </View>
    );
  }

  return (
    <View>
      <Carousel
        loop
        width={screenWidth - 32}
        height={169}
        style={{ alignSelf: "center" }}
        autoPlay
        data={carouselData}
        scrollAnimationDuration={900}
        autoPlayInterval={4000}
        renderItem={renderCarouselItem}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 0,
          parallaxAdjacentItemScale: 0.9,
        }}
        onProgressChange={(_, absoluteProgress) => {
          setActiveIndex(Math.round(absoluteProgress));
        }}
      />

      {/* Pagination dots */}
      <View style={styles.dots}>
        {carouselData.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === activeIndex ? styles.dotActive : undefined,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default CarouselComponent;

const styles = StyleSheet.create({
  loadingContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 10,
  },
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 2,
  },
  carouselImage: {
    width: "100%",
    height: "100%",
  },
  dots: {
    flexDirection: "row",
    alignSelf: "center",
    gap: 6,
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D1D5DB",
  },
  dotActive: {
    width: 18,
    backgroundColor: "#1D4ED8",
  },
});
