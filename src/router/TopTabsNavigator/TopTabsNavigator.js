import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ActivitiesScreen from "../../pages/TopTabs/ActivitiesScreen";
import FavoritesScreen from "../../pages/TopTabs/FavoritesScreen";

const TopTabsNavigator = ({ search = "" }) => {
  const [activeTab, setActiveTab] = useState(0);

  console.log("search", search);

  const tabs = [
    { key: "activities", title: "Aktiviteler" },
    { key: "favorites", title: "Favoriler" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <ActivitiesScreen search={search} />;
      case 1:
        return <FavoritesScreen />;
      default:
        return <ActivitiesScreen search={search} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tab,
              activeTab === index && styles.activeTab
            ]}
            onPress={() => setActiveTab(index)}
          >
            <Text style={[
              styles.tabText,
              activeTab === index && styles.activeTabText
            ]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.content}>
        {renderContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#0166FF",
  },
  tabText: {
    fontSize: 16,
    color: "#aaa",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#000",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
});

export default TopTabsNavigator;
