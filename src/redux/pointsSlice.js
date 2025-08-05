import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

// Async thunk - kullanıcının puanını getir
export const fetchUserPoints = createAsyncThunk(
  'points/fetchUserPoints',
  async (_, { rejectWithValue }) => {
    try {
      const result = await apiCall('/user/points', 'GET');
      return result.points || 0;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk - puan ekle
export const addUserPoints = createAsyncThunk(
  'points/addUserPoints',
  async (points, { rejectWithValue }) => {
    try {
      const result = await apiCall('/user/points/add', 'POST', { points });
      return result.points || 0;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const pointsSlice = createSlice({
  name: 'points',
  initialState: {
    currentPoints: 0,
    loading: false,
    error: null,
  },
  reducers: {
    addPoints: (state, action) => {
      state.currentPoints += action.payload;
    },
    setPoints: (state, action) => {
      state.currentPoints = action.payload;
    },
    clearPoints: (state) => {
      state.currentPoints = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPoints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPoints.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPoints = action.payload;
        state.error = null;
      })
      .addCase(fetchUserPoints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addUserPoints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUserPoints.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPoints = action.payload;
        state.error = null;
      })
      .addCase(addUserPoints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addPoints, setPoints, clearPoints } = pointsSlice.actions;
export default pointsSlice.reducer; 