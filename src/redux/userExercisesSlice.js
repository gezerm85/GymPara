import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env';

const API_URL = API_BASE_URL || 'http://10.0.2.2:5000/api';

// API çağrısı için yardımcı fonksiyon
const apiCall = async (endpoint, method = 'GET', data = null) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Bir hata oluştu');
    }

    return result;
  } catch (error) {
    throw new Error(error.message || 'Bağlantı hatası');
  }
};

export const loadUserExercises = createAsyncThunk(
  "userExercises/loadUserExercises",
  async (_, { rejectWithValue }) => {
    try {
      // Mock data - kullanıcının egzersiz kayıtları
      const mockExercises = [
        {
          id: 1,
          activityTitle: 'Futbol',
          duration: 90,
          unit: 'dakika',
          rating: 4,
          notes: 'Harika bir maç oldu, çok yorucuydu',
          body_parts: [1, 4, 5], // Göğüs, Bacak, Kol
          supplements: {
            creatine: { amount: 5, unit: 'gram' },
            protein: { amount: 25, unit: 'gram' }
          },
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 1 gün önce
        },
        {
          id: 2,
          activityTitle: 'Fitness',
          duration: 60,
          unit: 'dakika',
          rating: 5,
          notes: 'Göğüs ve sırt antrenmanı yaptım',
          body_parts: [1, 2], // Göğüs, Sırt
          supplements: {
            creatine: { amount: 3, unit: 'gram' },
            protein: { amount: 20, unit: 'gram' }
          },
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 gün önce
        }
      ];
      
      return mockExercises;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const saveUserExercise = createAsyncThunk(
  "userExercises/saveUserExercise",
  async (exerciseData, { rejectWithValue }) => {
    try {
      // Mock data - yeni egzersiz kaydı
      const newExercise = {
        id: Date.now(), // Unique ID
        ...exerciseData,
        createdAt: new Date().toISOString()
      };
      
      console.log('Mock exercise saved:', newExercise);
      return { exercise: newExercise };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userExercisesSlice = createSlice({
  name: "userExercises",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    saveStatus: "idle",
    saveError: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.saveError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Load exercises
      .addCase(loadUserExercises.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadUserExercises.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(loadUserExercises.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Save exercise
      .addCase(saveUserExercise.pending, (state) => {
        state.saveStatus = "loading";
        state.saveError = null;
      })
      .addCase(saveUserExercise.fulfilled, (state, action) => {
        state.saveStatus = "succeeded";
        // Yeni egzersizi listeye ekle
        state.items.unshift(action.payload.exercise);
      })
      .addCase(saveUserExercise.rejected, (state, action) => {
        state.saveStatus = "failed";
        state.saveError = action.payload;
      });
  },
});

export const { clearError } = userExercisesSlice.actions;
export default userExercisesSlice.reducer; 