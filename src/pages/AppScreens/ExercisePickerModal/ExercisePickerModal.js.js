import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Keyboard,
  ScrollView,
  Dimensions,
  FlatList,
  Modal,
  Alert,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import StarRating from 'react-native-star-rating-widget';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';
import { colors } from '../../../utils/Colors/Color';
import { useDispatch, useSelector } from 'react-redux';
import { saveUserExercise } from '../../../redux/userExercisesSlice';
import { saveWorkout } from '../../../redux/exercisesSlice';

const { width } = Dimensions.get('window');

const ExercisePickerModal = ({ navigation }) => {
  const dispatch = useDispatch();
  const { categories, exercises, loading } = useSelector((state) => state.exercises);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showLogModal, setShowLogModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exerciseForm, setExerciseForm] = useState({
    duration: '',
    unit: 'dakika',
    rating: 3,
    notes: '',
    bodyParts: [],
    supplements: {
      creatine: { amount: '', unit: 'gram' },
      protein: { amount: '', unit: 'gram' }
    }
  });

  // Vücut bölgeleri
  const bodyParts = [
    { id: 1, name: 'Göğüs', icon: 'dumbbell', color: '#FF6B6B' },
    { id: 2, name: 'Sırt', icon: 'weight-hanging', color: '#4ECDC4' },
    { id: 3, name: 'Omuz', icon: 'dumbbell', color: '#45B7D1' },
    { id: 4, name: 'Bacak', icon: 'person-walking', color: '#96CEB4' },
    { id: 5, name: 'Kol', icon: 'dumbbell', color: '#FFEAA7' },
    { id: 6, name: 'Karın', icon: 'person-walking', color: '#DDA0DD' },
  ];





  // Filtrelenmiş egzersizler
  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(search.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || exercise.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearchPress = () => {
    Keyboard.dismiss();
  };

  const handleExerciseSelect = (exercise) => {
    setSelectedExercise(exercise);
    setShowLogModal(true);
  };

  const handleBodyPartToggle = (bodyPartId) => {
    setExerciseForm(prev => ({
      ...prev,
      bodyParts: prev.bodyParts.includes(bodyPartId)
        ? prev.bodyParts.filter(id => id !== bodyPartId)
        : [...prev.bodyParts, bodyPartId]
    }));
  };

  const handleSaveExercise = async () => {
    if (!exerciseForm.duration) {
      Alert.alert('Hata', 'Lütfen egzersiz süresini girin');
      return;
    }

    try {
      // Body parts'ları API formatına çevir
      const selectedBodyParts = bodyParts.filter(part => 
        exerciseForm.bodyParts.includes(part.id)
      ).map(part => ({
        id: part.id,
        name: part.name,
        icon: part.icon,
        color: part.color
      }));

      // Backend formatına uygun data hazırla
      const workoutData = {
        exercise_data: {
          activity_id: selectedExercise.id.toString(),
          activity_title: selectedExercise.name,
          duration: parseInt(exerciseForm.duration),
          unit: exerciseForm.unit === 'dakika' ? 'dk' : exerciseForm.unit,
          rating: exerciseForm.rating,
          note: exerciseForm.notes,
          body_parts: selectedBodyParts,
          supplements: {
            creatine: {
              amount: parseInt(exerciseForm.supplements.creatine.amount) || 0,
              unit: exerciseForm.supplements.creatine.unit
            },
            protein: {
              amount: parseInt(exerciseForm.supplements.protein.amount) || 0,
              unit: exerciseForm.supplements.protein.unit
            }
          },
          created_at: new Date().toISOString()
        }
      };

      console.log('=== BACKEND\'E GÖNDERİLECEK VERİ ===');
      console.log('Workout Data:', workoutData);
      console.log('=====================================');

      // Redux ile backend'e gönder
      await dispatch(saveWorkout(workoutData));
      
      Alert.alert(
        'Başarılı!', 
        `${selectedExercise.name} egzersizi kaydedildi!`,
        [
          {
            text: 'Tamam',
            onPress: () => {
              setShowLogModal(false);
              setSelectedExercise(null);
              setExerciseForm({
                duration: '',
                unit: 'dakika',
                rating: 3,
                notes: '',
                bodyParts: [],
                supplements: {
                  creatine: { amount: '', unit: 'gram' },
                  protein: { amount: '', unit: 'gram' }
                }
              });
            }
          }
        ]
      );
    } catch (error) {
      console.error('Workout save error:', error);
      Alert.alert('Hata', 'Egzersiz kaydedilirken bir hata oluştu');
    }
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.selectedCategory
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Icon 
        name={item.icon} 
        size={20} 
        color={selectedCategory === item.id ? '#fff' : colors.MainColor} 
      />
      <Text style={[
        styles.categoryText,
        selectedCategory === item.id && styles.selectedCategoryText
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderExerciseItem = ({ item }) => (
    <TouchableOpacity
      style={styles.exerciseCard}
      onPress={() => handleExerciseSelect(item)}
    >
      <View style={styles.exerciseImageContainer}>
        <Icon 
          name={item.category_icon} 
          size={32} 
          color={colors.MainColor} 
        />
      </View>
      <View style={styles.exerciseInfo}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <Text style={styles.exerciseDescription}>{item.description}</Text>
        <View style={styles.exerciseDetails}>
          <View style={styles.detailItem}>
            <Icon name="clock" size={12} color="#666" />
            <Text style={styles.detailText}>{item.duration}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="fire" size={12} color="#666" />
            <Text style={styles.detailText}>{item.calories} kal</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="star" size={12} color="#666" />
            <Text style={styles.detailText}>{item.difficulty}</Text>
          </View>
        </View>
      </View>
      <Icon name="chevron-right" size={16} color="#ccc" />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <CustomHeader title="Egzersiz Kaydet" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.MainColor} />
          <Text style={styles.loadingText}>Egzersizler yükleniyor...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader title="Egzersiz Kaydet" />
      
      {/* Arama Bölümü */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Icon name="magnifying-glass" size={16} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Egzersiz ara..."
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
            onSubmitEditing={handleSearchPress}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Icon name="times" size={16} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Kategori Filtreleri */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Egzersiz Listesi */}
      <View style={styles.exercisesContainer}>
        <Text style={styles.sectionTitle}>
          {filteredExercises.length} egzersiz bulundu
        </Text>
        <FlatList
          data={filteredExercises}
          renderItem={renderExerciseItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.exercisesList}
        />
      </View>

      {/* Egzersiz Kayıt Modal */}
      <Modal
        visible={showLogModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowLogModal(false)}>
              <Icon name="xmark" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{selectedExercise?.name}</Text>
            <TouchableOpacity onPress={handleSaveExercise}>
              <Text style={styles.saveButton}>Kaydet</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Süre */}
            <View style={styles.formSection}>
              <Text style={styles.sectionLabel}>Süre</Text>
              <View style={styles.durationContainer}>
                <TextInput
                  style={styles.durationInput}
                  placeholder="30"
                  value={exerciseForm.duration}
                  onChangeText={(text) => setExerciseForm(prev => ({...prev, duration: text}))}
                  keyboardType="numeric"
                />
                <Text style={styles.unitText}>{exerciseForm.unit}</Text>
              </View>
            </View>

            {/* Değerlendirme */}
            <View style={styles.formSection}>
              <Text style={styles.sectionLabel}>Değerlendirme</Text>
              <View style={styles.ratingContainer}>
                <StarRating
                  rating={exerciseForm.rating}
                  onChange={(rating) => setExerciseForm(prev => ({...prev, rating}))}
                  starSize={32}
                  starStyle={{ marginHorizontal: 16 }}
                  color="#FFD700"
                  emptyColor="#e9ecef"
                  enableHalfStar={false}
                />
                <Text style={styles.ratingText}>{exerciseForm.rating}/5</Text>
              </View>
            </View>

            {/* Notlar */}
            <View style={styles.formSection}>
              <Text style={styles.sectionLabel}>Notlar</Text>
              <TextInput
                style={styles.notesInput}
                placeholder="Egzersiz hakkında notlarınız..."
                value={exerciseForm.notes}
                onChangeText={(text) => setExerciseForm(prev => ({...prev, notes: text}))}
                multiline
                numberOfLines={3}
              />
            </View>

            {/* Vücut Bölgeleri */}
            <View style={styles.formSection}>
              <Text style={styles.sectionLabel}>Çalıştırılan Vücut Bölgeleri</Text>
              <View style={styles.bodyPartsGrid}>
                {bodyParts.map((part) => (
                  <TouchableOpacity
                    key={part.id}
                    style={[
                      styles.bodyPartItem,
                      exerciseForm.bodyParts.includes(part.id) && styles.selectedBodyPart
                    ]}
                    onPress={() => handleBodyPartToggle(part.id)}
                  >
                    <Icon name={part.icon} size={16} color={part.color} />
                    <Text style={styles.bodyPartText}>{part.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Takviyeler */}
            <View style={styles.formSection}>
              <Text style={styles.sectionLabel}>Takviyeler (Opsiyonel)</Text>
              
              {/* Kreatin */}
              <View style={styles.supplementItem}>
                <Text style={styles.supplementLabel}>Kreatin</Text>
                <View style={styles.supplementInputs}>
                  <TextInput
                    style={styles.supplementInput}
                    placeholder="5"
                    value={exerciseForm.supplements.creatine.amount}
                    onChangeText={(text) => setExerciseForm(prev => ({
                      ...prev,
                      supplements: {
                        ...prev.supplements,
                        creatine: { ...prev.supplements.creatine, amount: text }
                      }
                    }))}
                    keyboardType="numeric"
                  />
                  <Text style={styles.unitText}>{exerciseForm.supplements.creatine.unit}</Text>
                </View>
              </View>

              {/* Protein */}
              <View style={styles.supplementItem}>
                <Text style={styles.supplementLabel}>Protein</Text>
                <View style={styles.supplementInputs}>
                  <TextInput
                    style={styles.supplementInput}
                    placeholder="20"
                    value={exerciseForm.supplements.protein.amount}
                    onChangeText={(text) => setExerciseForm(prev => ({
                      ...prev,
                      supplements: {
                        ...prev.supplements,
                        protein: { ...prev.supplements.protein, amount: text }
                      }
                    }))}
                    keyboardType="numeric"
                  />
                  <Text style={styles.unitText}>{exerciseForm.supplements.protein.unit}</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default ExercisePickerModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  categoriesContainer: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  selectedCategory: {
    backgroundColor: colors.MainColor,
    borderColor: colors.MainColor,
  },
  categoryText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  exercisesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  exercisesList: {
    paddingBottom: 20,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  exerciseDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  saveButton: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.MainColor,
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  formSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginRight: 8,
  },
  unitText: {
    fontSize: 16,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 16,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  bodyPartsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  bodyPartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  selectedBodyPart: {
    backgroundColor: colors.MainColor,
    borderColor: colors.MainColor,
  },
  bodyPartText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#333',
  },
  supplementItem: {
    marginBottom: 16,
  },
  supplementLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  supplementInputs: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  supplementInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginRight: 8,
  },
});