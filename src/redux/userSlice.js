import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env';

const API_URL = API_BASE_URL || 'http://10.0.2.2:5000/api';


console.log('API_URL', API_URL);
 
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
    console.error('API Call Error Details:', error);
    throw new Error(error.message || 'Bağlantı hatası');
  }
};

// Async Thunks
export const getUserProfile = createAsyncThunk(
  'user/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔄 getUserProfile çağrıldı');
      
      // Test için önce token olmadan deneyelim
      const result = await apiCall('/user/full', 'GET');
      
      console.log('📊 API\'den gelen profile:', result);
      console.log('📊 welcome_completed:', result.welcome_completed);
      
      return result;
    } catch (error) {
      console.error('❌ API Error - getUserProfile:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const result = await apiCall('/user/update', 'PUT', userData);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const markWelcomeCompleted = createAsyncThunk(
  'user/markWelcomeCompleted',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔄 markWelcomeCompleted çağrıldı');
      
      const token = await AsyncStorage.getItem('authToken');
      
      if (!token) {
        throw new Error('Token bulunamadı');
      }

      // PUT /api/profile/welcome
      const response = await fetch(`${API_URL}/profile/welcome`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ welcome_completed: true }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Welcome durumu güncellenemedi');
      }

      const result = await response.json();
      console.log('✅ Welcome durumu başarıyla güncellendi:', result);
      
      return result;
    } catch (error) {
      console.error('❌ markWelcomeCompleted hatası:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const uploadProfileImage = createAsyncThunk(
  'user/uploadProfileImage',
  async ({ imageUri, userId = 1 }, { rejectWithValue }) => {
    try {
      // FormData oluştur
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        type: 'image/png',
        name: 'profile_image.png'
      });

      const token = await AsyncStorage.getItem('authToken');
      
      // API çağrısı
      const response = await fetch(`${API_URL}/user/upload/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Fotoğraf yüklenemedi');
      }

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  profile: null,
  loading: false,
  error: null,
  uploadLoading: false,
  uploadError: null,
};

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.uploadError = null;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Profile
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Mark Welcome Completed
      .addCase(markWelcomeCompleted.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markWelcomeCompleted.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
          state.profile.welcome_completed = true;
        }
        state.error = null;
      })
      .addCase(markWelcomeCompleted.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Upload Profile Image
      .addCase(uploadProfileImage.pending, (state) => {
        state.uploadLoading = true;
        state.uploadError = null;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.uploadLoading = false;
        if (state.profile) {
          state.profile.profile_image_url = action.payload.url;
        }
        state.uploadError = null;
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.uploadLoading = false;
        state.uploadError = action.payload;
      });
  },
});

export const { clearError, setProfile } = userSlice.actions;
export default userSlice.reducer; 