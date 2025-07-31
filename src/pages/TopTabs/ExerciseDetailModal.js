import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Menu, Button, Provider as PaperProvider, Dialog, Portal } from 'react-native-paper';
import StarRating from 'react-native-star-rating-widget';
import { firestoreDB, auth } from '../../firebase/firebaseConfig.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { addUserPoints, getSportPoints } from '../../firebase/pointSystem.js';
import { useDispatch } from 'react-redux';
import { addPoints } from '../../redux/pointsSlice.js';

const units = ["dk", "saat"];

const ExerciseDetailModal = ({ activity, onClose }) => {
  const dispatch = useDispatch();
  const [duration, setDuration] = useState("");
  const [unit, setUnit] = useState("dk");
  const [note, setNote] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]); // array
  const [rating, setRating] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');

  if (!activity) return null;

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && tags.length < 4 && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };
  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSave = async () => {
    if (!duration || !activity.id) {
      setDialogTitle('Eksik bilgi');
      setDialogMessage('Süre ve egzersiz seçimi zorunlu.');
      setDialogVisible(true);
      return;
    }
    setLoading(true);
    try {
      const userId = auth.currentUser?.uid || null;
      
      // Egzersizi kaydet
      await addDoc(collection(firestoreDB, 'user_exercises'), {
        userId,
        activityId: activity.id,
        activityTitle: activity.title,
        duration: Number(duration),
        unit,
        rating,
        note,
        tags,
        createdAt: serverTimestamp(),
      });

      // Kullanıcıya puan ekle
      const pointsEarned = await addUserPoints(userId, activity.title);
      
      // Redux state'ini güncelle
      dispatch(addPoints(pointsEarned));
      
      setLoading(false);
      
      // Başarı mesajı göster
      setDialogTitle('Başarılı!');
      setDialogMessage(`${activity.title} egzersizi kaydedildi!\n+${pointsEarned} puan kazandınız!`);
      setDialogVisible(true);
    } catch (error) {
      setLoading(false);
      setDialogTitle('Kayıt Hatası');
      setDialogMessage(error.message || 'Kayıt sırasında bir hata oluştu.');
      setDialogVisible(true);
    }
  };

  // Bu spor için kazanılacak puanı hesapla
  const pointsForThisSport = getSportPoints(activity.title);

  return (
    <PaperProvider>
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
            <View style={styles.header}>
              <Text style={styles.title}>{activity.title}</Text>
              <TouchableOpacity onPress={onClose}>
                <Icon name="xmark" size={22} color="#888" />
              </TouchableOpacity>
            </View>

            {/* Puan bilgisi */}
            <View style={styles.pointsContainer}>
              <Icon name="star" size={16} color="#FFD700" />
              <Text style={styles.pointsText}>Bu egzersiz için +{pointsForThisSport} puan kazanacaksınız</Text>
            </View>

            <Text style={styles.label}>Süre:</Text>
            <View style={styles.durationRow}>
              <TextInput
                style={[styles.input, { flex: 1, marginRight: 8 }]}
                placeholder="Kaç?"
                value={duration}
                onChangeText={setDuration}
                keyboardType="numeric"
                maxLength={3}
              />
              <Menu
                visible={menuVisible}
                onDismiss={() => setMenuVisible(false)}
                anchor={
                  <Button
                    mode="outlined"
                    onPress={() => setMenuVisible(true)}
                    style={styles.unitButton}
                    labelStyle={styles.unitButtonLabel}
                  >
                    {unit}
                  </Button>
                }
                contentStyle={{ borderRadius: 10 }}
              >
                {units.map((u) => (
                  <Menu.Item
                    key={u}
                    onPress={() => { setUnit(u); setMenuVisible(false); }}
                    title={u}
                    titleStyle={{ color: unit === u ? '#007BFF' : '#222', fontWeight: unit === u ? 'bold' : 'normal' }}
                  />
                ))}
              </Menu>
            </View>
            <Text style={styles.label}>Puan:</Text>
            <View style={styles.starsRow}>
              <StarRating
                rating={rating}
                onChange={setRating}
                starSize={42}
                color="#FFD700"
                emptyColor="#E0E0E0"
                enableHalfStar={false}
                style={{ marginVertical: 8 }}
              />
            </View>
            <Text style={styles.label}>Not:</Text>
            <TextInput
              style={[styles.input, { height: 60 }]}
              placeholder="Not bırak..."
              value={note}
              onChangeText={setNote}
              multiline
            />
            <Text style={styles.label}>Etiketler:</Text>
            <View style={styles.tagRow}>
              <TextInput
                style={[styles.input, { flex: 1, marginRight: 8 }]}
                placeholder="Etiket yaz..."
                value={tagInput}
                onChangeText={setTagInput}
                maxLength={16}
                editable={tags.length < 4}
              />
              <TouchableOpacity
                style={[styles.addTagButton, tags.length >= 4 && { backgroundColor: '#ccc' }]}
                onPress={handleAddTag}
                disabled={tags.length >= 4 || !tagInput.trim()}
              >
                <Text style={styles.addTagButtonText}>Ekle</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tagsContainer}>
              {tags.map((tag) => (
                <View key={tag} style={styles.tagChip}>
                  <Text style={styles.tagText}>{tag}</Text>
                  <TouchableOpacity onPress={() => handleRemoveTag(tag)}>
                    <Icon name="xmark" size={14} color="#888" style={{ marginLeft: 4 }} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
              <Text style={styles.saveButtonText}>{loading ? 'Kaydediliyor...' : 'Kaydet'}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title style={styles.dialogTitle}>
            {dialogTitle}
          </Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogContent}>{dialogMessage}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button 
              onPress={() => {
                setDialogVisible(false);
                if (dialogTitle === 'Başarılı!') {
                  onClose();
                }
              }} 
              mode="contained"
            >
              Tamam
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
    marginBottom: 4,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    color: '#222',
  },
  unitButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minWidth: 54,
    marginRight: 0,
    marginLeft: 0,
    height: 44,
    justifyContent: 'center',
  },
  unitButtonLabel: {
    fontSize: 16,
    color: '#222',
    textTransform: 'none',
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    marginBottom: 8,
    marginTop: 2,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  addTagButton: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addTagButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 2,
    marginBottom: 8,
    gap: 8,
  },
  tagChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F2FE',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    color: '#007BFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 14,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    marginTop: 12,
  },
  pointsText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#222',
    fontWeight: 'bold',
  },
  dialogTitle: {
    textAlign: 'center',
    fontFamily: 'Bold',
  },
  dialogContent: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: 'Medium',
  },
});

export default ExerciseDetailModal; 