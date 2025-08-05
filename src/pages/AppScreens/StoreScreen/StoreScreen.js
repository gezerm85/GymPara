import { StyleSheet, Text, View, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StoreCard from "../../../components/Cards/StoreCard/StoreCard";
import CustomHeader from "../../../components/CustomHeader/CustomHeader";
import { fetchRewards } from "../../../redux/rewardsSlice";

const renderItem = ({ item }) => <StoreCard item={item} />;

const StoreScreen = () => {
  const dispatch = useDispatch();
  const { rewards, loading } = useSelector((state) => state.rewards);

  useEffect(() => {
    dispatch(fetchRewards());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.container}>
        <CustomHeader title="Mağaza" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B6B" />
          <Text style={styles.loadingText}>Ödüller yükleniyor...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader title="Mağaza" />
      <View style={styles.bodyContainer}>
        <FlatList
          data={rewards}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});
