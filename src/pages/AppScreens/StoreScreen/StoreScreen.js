import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import StoreCard from "../../../components/Cards/StoreCard/StoreCard";
import data from "../../../data/data";
import CustomHeader from "../../../components/CustomHeader/CustomHeader";

const renderItem = ({ item }) => <StoreCard item={item} />;

const StoreScreen = () => {
  return (
    <View style={styles.container}>
      <CustomHeader title="Mağaza" />
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
    flex: 1,
    backgroundColor: "#fff",
  },
  bodyContainer: {
    flex: 1,
    marginTop: 0,
    paddingHorizontal: 16,
  },
});
