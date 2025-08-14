import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, StatusBar } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { colors } from "../../../utils/Colors/Color";
import leaderboard from "../../../assets/images/leaderboard.png";
import madalya from "../../../assets/images/madalya.png";
import { API_IMAGE_BASE_URL } from '@env';

const IMAGE_BASE_URL = API_IMAGE_BASE_URL || 'http://10.0.2.2:5000';

const LeaderboardScreen = ({ navigation }) => {
  const { items: leaderboardData, loading } = useSelector((state) => state.leaderboard);

  const renderLeaderboardItem = ({ item, index }) => {
    const getRankColor = (rank) => {
      switch (rank) {
        case 0: return "#FFD700"; // Altın
        case 1: return "#C0C0C0"; // Gümüş
        case 2: return "#CD7F32"; // Bronz
        default: return "#E5E7EB";
      }
    };

    const getRankIcon = (rank) => {
      switch (rank) {
        case 0: return "🥇";
        case 1: return "🥈";
        case 2: return "🥉";
        default: return `${rank + 1}`;
      }
    };

    return (
      <View style={styles.leaderboardItem}>
        {/* Rank */}
        <View style={[styles.rankContainer, { backgroundColor: getRankColor(index) }]}>
          <Text style={styles.rankText}>{getRankIcon(index)}</Text>
        </View>

        {/* User Info */}
        <View style={styles.userInfo}>
          <Image 
            source={item.profile_image_url ? { uri: `${IMAGE_BASE_URL}${item.profile_image_url}` } : leaderboard} 
            style={styles.avatar} 
          />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{item.name || "Kullanıcı"}</Text>
            <Text style={styles.userStats}>
              {item.activity_level || "Aktif"} • {item.workout_days?.length || 0} gün
            </Text>
          </View>
        </View>

        {/* Score */}
        <View style={styles.scoreContainer}>
          <Text style={styles.score}>
            {Intl.NumberFormat("tr-TR").format(item.point || 0)}
          </Text>
          <Text style={styles.scoreUnit}>GP</Text>
          {index < 3 && <Image source={madalya} style={styles.medal} />}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

      
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={styles.headerTitle}>En Aktif Sporcular</Text>
          <Text style={styles.headerSubtitle}>Bu hafta en çok puan toplayanlar</Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Liderlik tablosu yükleniyor...</Text>
          </View>
        ) : (
          <FlatList
            data={leaderboardData}
            renderItem={renderLeaderboardItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )}
      </View>
    </View>
  );
};

export default LeaderboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerSection: {
    paddingVertical: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#6B7280",
  },
  listContainer: {
    paddingBottom: 20,
  },
  leaderboardItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 2,
  },
  rankContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  rankText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  userInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  userStats: {
    fontSize: 14,
    color: "#6B7280",
  },
  scoreContainer: {
    alignItems: "flex-end",
  },
  score: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.MainColor,
    marginBottom: 2,
  },
  scoreUnit: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
  },
  medal: {
    width: 20,
    height: 20,
    marginTop: 4,
  },
  separator: {
    height: 8,
  },
});
