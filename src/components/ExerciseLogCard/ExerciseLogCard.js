import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { colors } from "../../utils/Colors/Color";
import { calculateCalories } from "../../utils/calorieCalculator";

const ExerciseLogCard = ({ exercise }) => {
  // Tarih formatını düzenle
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      day: 'numeric', 
      month: 'long', 
      weekday: 'long' 
    };
    const dateStr = date.toLocaleDateString('tr-TR', options);
    
    // Saati ekle
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const timeStr = `${hours}:${minutes}`;
    
    return `${dateStr} ${timeStr}`;
  };

  // Süre formatını düzenle
  const formatDuration = (duration, unit) => {
    if (unit === "saat") {
      return `${duration}saat`;
    } else {
      return `${duration}dk`;
    }
  };

  const calories = calculateCalories(exercise.duration, exercise.unit, exercise.activityTitle);
  const formattedDate = formatDate(exercise.createdAt);
  const formattedDuration = formatDuration(exercise.duration, exercise.unit);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{exercise.activityTitle}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
      
      {exercise.note && (
        <Text style={styles.description} numberOfLines={2}>
          {exercise.note}
        </Text>
      )}
      
      {exercise.tags && exercise.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {exercise.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      )}
      
      <View style={styles.separator} />
      
      <View style={styles.metricsContainer}>
        <View style={styles.metricChip}>
          <Text style={styles.calorieText}>{calories}kal</Text>
        </View>
        
        <View style={styles.metricChip}>
          <Icon name="fire" size={12} color="#FF6B35" style={styles.icon} />
          <Text style={styles.durationText}>{formattedDuration}</Text>
        </View>
        
        {exercise.rating > 0 && (
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Icon
                key={star}
                name="star"
                size={12}
                color={star <= exercise.rating ? "#FFD700" : "#E0E0E0"}
                style={styles.star}
              />
            ))}
          </View>
        )}
        
        <TouchableOpacity style={styles.editButton}>
          <Icon name="pen" size={14} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.MainColor,
    flex: 1,
  },
  date: {
    fontSize: 14,
    color: "#999",
    fontWeight: '600'
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  tag: {
    backgroundColor: "#F0F0F0",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: "#666",
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 12,
  },
  metricsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  metricChip: {
    backgroundColor: "#F8F8F8",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  calorieText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#007AFF",
  },
  durationText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  icon: {
    marginRight: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    marginRight: 2,
  },
  editButton: {
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ExerciseLogCard; 