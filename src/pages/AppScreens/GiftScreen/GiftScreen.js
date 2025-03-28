import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import BonusCard from "../../../components/Cards/BonusCard/BonusCard";
import bonusData from '../../../data/bonusData'

const GiftScreen = () => {
  const renderItem = ({item}) => <BonusCard item={item} />
  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
      <FlatList
        data={bonusData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 16, paddingBottom: 65 }}
        showsVerticalScrollIndicator={false}
      />
      </View>
    </View>
  );
};

export default GiftScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8'
  },
  bodyContainer:{
    paddingHorizontal: 16,
    marginTop: 16,
  },
});
