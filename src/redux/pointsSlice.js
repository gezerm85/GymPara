import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPoints } from '../firebase/pointSystem.js';
import { auth } from '../firebase/firebaseConfig.js';

// Async thunk - kullanıcının puanını getir
export const fetchUserPoints = createAsyncThunk(
  'points/fetchUserPoints',
  async (_, { rejectWithValue }) => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        return rejectWithValue('Kullanıcı girişi yapılmamış');
      }
      const points = await getUserPoints(userId);
      return points;
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
      });
  },
});

export const { addPoints, setPoints, clearPoints } = pointsSlice.actions;
export default pointsSlice.reducer; 