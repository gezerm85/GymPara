import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env';

const API_URL = API_BASE_URL || 'http://10.0.2.2:5000/api';

// Async thunk for fetching rewards
export const fetchRewards = createAsyncThunk(
  'rewards/fetchRewards',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/rewards`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Rewards fetch failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Rewards API Error:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const purchaseReward = createAsyncThunk(
  'rewards/purchaseReward',
  async (rewardId, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/rewards/${rewardId}/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Reward purchase failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Reward Purchase Error:', error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  rewards: [],
  loading: false,
  error: null
};

const rewardsSlice = createSlice({
  name: 'rewards',
  initialState,
  reducers: {
    clearRewardsData: (state) => {
      state.rewards = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRewards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRewards.fulfilled, (state, action) => {
        state.loading = false;
        state.rewards = action.payload;
      })
      .addCase(fetchRewards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Purchase Reward
      .addCase(purchaseReward.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(purchaseReward.fulfilled, (state, action) => {
        state.loading = false;
        // Başarılı satın alma sonrası yapılacak işlemler
      })
      .addCase(purchaseReward.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearRewardsData } = rewardsSlice.actions;
export default rewardsSlice.reducer; 