import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Android emulator için localhost yerine 10.0.2.2 kullan
const API_BASE_URL = 'http://10.0.2.2:5000/api';

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token'ı header'a otomatik ekleme
api.interceptors.request.use(async (config) => {
  console.log('🚀 API Request:', config.method?.toUpperCase(), config.url);
  console.log('📦 Request Data:', config.data);
  
  const token = await AsyncStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// 401 durumunda token'ı temizle
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.data);
    return response;
  },
  async (error) => {
    console.log('❌ API Error:', error.response?.status, error.response?.data);
    console.log('🔍 Error Details:', error.message);
    
    if (error.response?.status === 401) {
      await AsyncStorage.multiRemove(['authToken', 'userData']);
      console.warn('❌ Oturum süresi doldu. Çıkış yapıldı.');
    }
    return Promise.reject(error);
  }
);

// Temel istek fonksiyonu
const apiCall = async (endpoint, method = 'GET', data = null) => {
  try {
    console.log('📡 API Call:', method, endpoint);
    console.log('📤 Request Data:', data);
    
    const response = await api({
      method,
      url: endpoint,
      data,
    });
    
    console.log('📥 Response Data:', response.data);
    return response.data;
  } catch (error) {
    console.log('💥 API Call Error:', error);
    
    if (error.response) {
      // Server'dan gelen hata
      const errorMessage = error.response.data?.message || error.response.data?.error || 'Server hatası';
      console.log('🔴 Server Error:', error.response.status, errorMessage);
      throw new Error(errorMessage);
    } else if (error.request) {
      // Bağlantı hatası
      console.log('🔴 Network Error:', error.message);
      throw new Error('API sunucusuna bağlanılamıyor. Sunucunun çalıştığından emin olun.');
    } else {
      // Diğer hatalar
      console.log('🔴 Other Error:', error.message);
      throw new Error(error.message || 'Beklenmeyen bir hata oluştu');
    }
  }
};

// 🔹 Kullanıcı Kaydı
export const registerUser = async ({ name, email, password }) => {
  if (!name || !email || !password) throw new Error("Tüm alanları doldurun.");
  return apiCall('/auth/register', 'POST', { name, email, password });
};

// 🔹 Giriş
export const loginUser = async ({ email, password }) => {
  if (!email || !password) throw new Error("Email ve şifre gerekli.");
  return apiCall('/auth/login', 'POST', { email, password });
};

// 🔹 Çıkış
export const logoutUser = async () => {
  try {
    await apiCall('/auth/logout', 'POST');
  } catch (e) {
    console.warn("Backend'e logout bildirilemedi.");
  } finally {
    await AsyncStorage.multiRemove(['authToken', 'userData']);
  }
};

// 🔹 Kullanıcı Profil Bilgilerini Getir
export const getUserProfile = async () => {
  try {
    const result = await apiCall('/user/full/1', 'GET'); // Şimdilik sabit user_id: 1
    console.log('Profil bilgileri alındı:', result);
    return result;
  } catch (error) {
    console.error('Profil bilgileri alınamadı:', error);
    throw error;
  }
};

// 🔹 Kullanıcı Verilerini Güncelle
export const updateUserProfile = async (userData) => {
  return apiCall('/user/update', 'PUT', userData);
};

// 🔹 Welcome Completed İşaretle
export const markWelcomeCompleted = async () => {
  return apiCall('/user/welcome-completed', 'PUT', { welcome_completed: true });
};

// 🔹 Profil Fotoğrafı Yükle
export const uploadProfileImage = async (imageUri, userId = 1) => {
  try {
    console.log('Profil fotoğrafı yükleniyor:', imageUri);
    
    // FormData oluştur
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/png',
      name: 'profile_image.png'
    });

    // API çağrısı
    const response = await fetch(`${API_BASE_URL}/user/upload/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Fotoğraf yüklenemedi');
    }

    console.log('Profil fotoğrafı yüklendi:', result);
    return result;
  } catch (error) {
    console.error('Profil fotoğrafı yükleme hatası:', error);
    throw error;
  }
};
