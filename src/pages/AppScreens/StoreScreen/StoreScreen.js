import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import StoreCard from "../../../components/Cards/StoreCard/StoreCard";
import data from "../../../data/data";

const renderItem = ({ item }) => <StoreCard item={item} />;

const StoreScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: 16, paddingBottom: 65 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default StoreScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  bodyContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
});
