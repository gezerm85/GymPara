import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { firestoreDB } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import ActivitiesCard from "../../components/Cards/ActivitiesCard/ActivitiesCard";

const ActivitiesScreen = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestoreDB, "activities"));
        const activityList = [];

        querySnapshot.forEach((doc) => {
          activityList.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setActivities(activityList);
        setLoading(false);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={{ marginTop: 10 }}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ActivitiesCard item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

});

export default ActivitiesScreen;
