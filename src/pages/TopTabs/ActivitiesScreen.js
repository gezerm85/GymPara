import React, { useState } from "react";
import { View, FlatList, StyleSheet, Modal, TouchableOpacity } from "react-native";
import ActivitiesCard from "../../components/Cards/ActivitiesCard/ActivitiesCard";
import ExerciseDetailModal from "./ExerciseDetailModal";

const mockActivities = [
  {
    id: "1",
    title: "Futbol",
    description: "Takım sporu, kardiyo ve dayanıklılık.",
    image: "https://example.com/futbol.png"
  },
  {
    id: "2",
    title: "Basketbol",
    description: "Zıplama, hız ve koordinasyon.",
    image: "https://example.com/basketbol.png"
  },
  {
    id: "3",
    title: "Yoga",
    description: "Esneklik ve denge.",
    image: "https://example.com/yoga.png"
  },
  {
    id: "4",
    title: "Koşu",
    description: "Kardiyo, dayanıklılık ve yağ yakımı.",
    image: "https://example.com/kosu.png"
  },
  {
    id: "5",
    title: "Pilates",
    description: "Core güçlendirme ve esneklik.",
    image: "https://example.com/pilates.png"
  },
];

const ActivitiesScreen = ({ search = "" }) => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filteredActivities = mockActivities.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleCardPress = (item) => {
    setSelectedActivity(item);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredActivities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCardPress(item)}>
            <ActivitiesCard item={item} />
          </TouchableOpacity>
        )}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <ExerciseDetailModal
          activity={selectedActivity}
          onClose={() => setModalVisible(false)}
        />
      </Modal>
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
