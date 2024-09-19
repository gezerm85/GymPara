import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import SportsCard from "../../../../components/Cards/SportsCard/SportsCard";
import fitness from "../../../../data/fitness";

const StartLevel = () => {
  const renderItem = ({ item }) => <SportsCard item={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={fitness}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
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
