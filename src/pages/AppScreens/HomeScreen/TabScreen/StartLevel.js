import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import SportsCard from "../../../../components/Cards/SportsCard/SportsCard";
import data from "../../../../data/data";

const StartLevel = () => {
  const renderItem = ({ item }) => <SportsCard item={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
export default StartLevel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
