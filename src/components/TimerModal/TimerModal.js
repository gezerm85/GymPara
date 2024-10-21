import React, { useState, useRef } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { BlurView } from "expo-blur";

const { width } = Dimensions.get("window");

const sports = [
  { id: "1", name: "Basketbol", icon: "basketball" },
  { id: "2", name: "Bisiklet", icon: "bike" },
  { id: "3", name: "Tenis", icon: "tennis" },
  { id: "4", name: "Futbol", icon: "soccer" },
  { id: "5", name: "Voleybol", icon: "volleyball" },
  { id: "6", name: "Hentbol", icon: "handball" },
];

const DEFAULT_ITEM_SIZE = 64;
const SELECTED_ITEM_SIZE = 86; 
const ITEM_SPACING = 16; 

const TimerModal = ({ visible, onClose }) => {
  const [selectedSportIndex, setSelectedSportIndex] = useState(0);
  const flatListRef = useRef(null);

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const centeredIndex = viewableItems[Math.floor(viewableItems.length / 2)].index;
      setSelectedSportIndex(centeredIndex); 
    }
  });

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 50,
  };

  const handleSelectSport = (index) => {
    setSelectedSportIndex(index);
    flatListRef.current.scrollToIndex({ index, animated: true });
  };

  const renderItem = ({ item, index }) => {
    const isSelected = selectedSportIndex === index;
    const itemSize = isSelected ? SELECTED_ITEM_SIZE : DEFAULT_ITEM_SIZE;

    return (
      <TouchableOpacity
        onPress={() => handleSelectSport(index)}
        style={[
          styles.iconWrapper,
          { width: itemSize, height: itemSize }, // Dinamik genişlik ve yükseklik
          isSelected && styles.selectedIconWrapper, // Seçili olan ikonu vurgula
        ]}
      >
        <Icon
          name={item.icon}
          size={itemSize * 0.5} // İkon boyutu (ikonun büyüklüğüne göre ayarlandı)
          color={isSelected ? "#fff" : "#007bff"}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.animatedWrapper}>
        <BlurView intensity={20} style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.Headerbutton}>
              <Icon name="close" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Spor branşınızı seçin?</Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.selectedSportText}>
              {sports[selectedSportIndex].name}
            </Text>
            <FlatList
              ref={flatListRef}
              data={sports}
              horizontal
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.flatListContent}
              snapToAlignment="center"
              snapToInterval={DEFAULT_ITEM_SIZE + ITEM_SPACING}
              decelerationRate="fast"
              onViewableItemsChanged={onViewRef.current}
              viewabilityConfig={viewabilityConfig}
              getItemLayout={(data, index) => ({
                length: DEFAULT_ITEM_SIZE,
                offset: (DEFAULT_ITEM_SIZE + ITEM_SPACING) * index,
                index,
              })}
            />
            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.startButtonText}>Spora Başla</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  animatedWrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(20, 20, 20, 0.7)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingTop: 16,
    gap: 26,
  },
  Headerbutton: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 16,
  },
  headerText: {
    fontSize: 22,
    color: "#fff",
    fontFamily: "SemiBold",
    textAlignVertical: "center",
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#fff",
    marginHorizontal: ITEM_SPACING / 2, 
  },
  selectedIconWrapper: {
    backgroundColor: "#007bff",
  },
  flatListContent: {
    alignItems: "center",
  },
  selectedSportText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 2, 
  },
  startButton: {
    backgroundColor: "#007bff",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default TimerModal;
