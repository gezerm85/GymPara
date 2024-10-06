import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import SportsCard from "../../../../components/Cards/SportsCard/SportsCard";
import fitness from "../../../../data/fitness";

const ExpertLevel = () => {
  const renderItem = ({ item }) => <SportsCard item={item} />;
  return (
    <View style={styles.container}>
      <FlatList
        data={fitness}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{gap: 16}}
      />
    </View>
  );
};

export default ExpertLevel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 16,
    paddingHorizontal: 16,

  },
});
