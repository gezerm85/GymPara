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

// Async Thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const result = await apiCall('/auth/login', 'POST', { email, password });
      
      // Token'ı AsyncStorage'a kaydet
      await AsyncStorage.setItem('authToken', result.token);
      await AsyncStorage.setItem('userData', JSON.stringify(result.user));
      
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const result = await apiCall('/auth/register', 'POST', { name, email, password });
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await apiCall('/auth/logout', 'POST');
      
      // Remember me kontrolü
      const rememberMe = await AsyncStorage.getItem('rememberMe');
      
      if (rememberMe === 'true') {
        // Remember me açıksa sadece token'ı sil, diğer bilgileri koru
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('userData');
      } else {
        // Remember me kapalıysa tüm bilgileri sil
        await AsyncStorage.multiRemove([
          'authToken', 
          'userData', 
          'rememberMe', 
          'rememberedEmail', 
          'rememberedPassword'
        ]);
      }
      
      return true;
    } catch (error) {
      // Hata olsa bile local storage'ı temizle
      const rememberMe = await AsyncStorage.getItem('rememberMe');
      
      if (rememberMe === 'true') {
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('userData');
      } else {
        await AsyncStorage.multiRemove([
          'authToken', 
          'userData', 
          'rememberMe', 
          'rememberedEmail', 
          'rememberedPassword'
        ]);
      }
      
      return rejectWithValue(error.message);
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  'auth/checkStatus',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const userData = await AsyncStorage.getItem('userData');
      
      if (token && userData) {
        return {
          token,
          user: JSON.parse(userData)
        };
      }
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      
      // Check Auth Status
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, setLoading } = authSlice.actions;
export default authSlice.reducer; 