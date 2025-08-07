import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { colors } from '../../../utils/Colors/Color'
import { API_IMAGE_BASE_URL } from '@env';
import Gift from '../../../assets/images/gift.png'

const IMAGE_BASE_URL = API_IMAGE_BASE_URL || 'http://10.0.2.2:5000';

const StoreCard = ({ item }) => {
  const nav = useNavigation();
  const handleOnPress = () => {
   // nav.navigate('StoreDetailScreen', {item});
    nav.navigate("Home", { screen: "StoreDetailScreen", params: { item: item} });

  };
  return (
    <TouchableOpacity onPress={handleOnPress} style={styles.container}>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={{ uri: `${IMAGE_BASE_URL}${item.img}` }}/>
      </View>
      <View style={styles.bodyContainer}> 
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.model}>{item.model}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.price}>
          {item.price}
          <Text style={{ color: colors.textColor }}> GP</Text>
        </Text>
      </View>
      <View style={styles.giftContainer}>
        <Image style={styles.gift} source={Gift} />
      </View>
    </TouchableOpacity>
  );
};

export default StoreCard;

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    gap: 16,
    paddingVertical: 16,
  },
  imgContainer: {
    height: "100",
    backgroundColor: "#f5f5f5",
    borderRadius: 24,
  },
  bodyContainer: {
    flex: 1,
  },
  giftContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  title: {
    fontFamily: "Medium",
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  model: {
    fontFamily: "Regular",
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  description: {
    fontFamily: "Regular",
    fontSize: 12,
    color: "#999",
    lineHeight: 16,
    marginBottom: 8,
  },
  img: {
    width: 88,
    height: 88,
  },
  gift: {
    width: 20,
    height: 20,
  },
  price: {
    fontFamily: "ExtraBold",
    color: colors.MainColor,
    fontSize: 18,
  },
});
