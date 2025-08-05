import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env';

const API_URL = API_BASE_URL || 'http://10.0.2.2:5000/api';

// Async thunks
export const fetchCategories = createAsyncThunk(
  'exercises/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/exercises/categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Categories fetch failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Categories API Error:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchExercises = createAsyncThunk(
  'exercises/fetchExercises',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/exercises`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Exercises fetch failed');
      } 

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Exercises API Error:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const saveWorkout = createAsyncThunk(
  'exercises/saveWorkout',
  async (workoutData, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/workouts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(workoutData)
      });

      if (!response.ok) {
        throw new Error('Workout save failed');
      }

      const data = await response.json();
      console.log('Workout Save Response:', data);
      return data;
    } catch (error) {
      console.error('Workout Save Error:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchWorkouts = createAsyncThunk(
  'exercises/fetchWorkouts',
  async (_, { rejectWithValue }) => {
    try { 
      const token = await AsyncStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/workouts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Workouts fetch failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Workouts Fetch Error:', error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  categories: [],
  exercises: [],
  workouts: [],
  loading: false,
  error: null
};

const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    clearExercisesData: (state) => {
      state.categories = [];
      state.exercises = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Exercises
      .addCase(fetchExercises.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExercises.fulfilled, (state, action) => {
        state.loading = false;
        state.exercises = action.payload;
      })
      .addCase(fetchExercises.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Save Workout
      .addCase(saveWorkout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveWorkout.fulfilled, (state, action) => {
        state.loading = false;
        // Başarılı kayıt sonrası yapılacak işlemler
      })
      .addCase(saveWorkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Workouts
      .addCase(fetchWorkouts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkouts.fulfilled, (state, action) => {
        state.loading = false;
        state.workouts = action.payload;
      })
      .addCase(fetchWorkouts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearExercisesData } = exercisesSlice.actions;
export default exercisesSlice.reducer; 