import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome6";
import { colors } from "../../utils/Colors/Color";

const FavoritesScreen = () => {
  const favorites = useSelector((state) => state.favorites.items);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Icon name="star" size={20} color={colors.MainColor} solid />
    </View>
  );

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>Favori aktiviteniz yok</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  card: {
    borderBottomWidth: 1,
    borderColor: "#E3E3E3",
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: "#333",
  },
  emptyText: {
    marginTop: 40,
    fontSize: 16,
    textAlign: "center",
    color: "#999",
  },
});

export default FavoritesScreen;
