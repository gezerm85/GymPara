import { StyleSheet, Text, View, Image, Pressable, ActivityIndicator, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome6";
import { colors } from "../../utils/Colors/Color";
import leaderboard from "../../assets/images/leaderboard.png";
import madalya from "../../assets/images/madalya.png";
import { API_IMAGE_BASE_URL } from '@env';

const IMAGE_BASE_URL = API_IMAGE_BASE_URL || 'http://10.0.2.2:5000';

const LeaderboardComponent = ({
  onPress = () => {},
  navigation,
}) => {
  const { items: leaderboardData, loading, error } = useSelector((state) => state.leaderboard);

  // İlk kullanıcıyı al (en yüksek skorlu)
  const topUser = leaderboardData?.[0] || null;

  const handleCardPress = () => {
    if (navigation) {
      navigation.navigate('LeaderboardScreen');
    } else {
      onPress();
    }
  };

  if (loading) {
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            🔥 Liderlik <Text style={styles.headerTextAccent}>Tablosu</Text>
          </Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={colors.MainColor} />
        </View>
      </View>
    );
  }

  if (error || !topUser) {
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            🔥 Liderlik <Text style={styles.headerTextAccent}>Tablosu</Text>
          </Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Veri yüklenemedi</Text>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.card} onPress={handleCardPress}>
      {/* Header */}
      <Pressable style={styles.header} onPress={handleCardPress} android_ripple={{ color: "#e9e9ef" }}>
        <Text style={styles.headerText}>
          🔥 Liderlik <Text style={styles.headerTextAccent}>Tablosu</Text>
        </Text>
        <Icon name="angle-right" size={18} color={colors.MainColor} />
      </Pressable>

      {/* Row */}
      <View style={styles.row}>
        <View style={styles.left}>
          <Image 
            source={topUser.profile_image_url ? { uri: `${IMAGE_BASE_URL}${topUser.profile_image_url}` } : leaderboard} 
            style={styles.avatar} 
          />
          <Text style={styles.name}>
            <Text style={styles.firstName}>{topUser.name || "Kullanıcı"}</Text>
          </Text>
        </View>

        <View style={styles.right}>
          <Text style={styles.score}>
            {Intl.NumberFormat("tr-TR").format(topUser.point || 0)}
            <Text style={styles.scoreUnit}> GP</Text>
          </Text>
          <Image source={madalya} style={styles.medal} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LeaderboardComponent;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    gap: 12,

  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  headerTextAccent: {
    color: colors.MainColor,
  },
  loadingContainer: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 14,
    color: "#6B7280",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8F8F8",
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flexShrink: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  name: {
    flexShrink: 1,
  },
  firstName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  lastName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  score: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.MainColor,
  },
  scoreUnit: {
    fontSize: 10,
    fontWeight: "700",
    color: "#000",
  },
  medal: {
    width: 22,
    height: 22,
  },
});
