import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';

// **1️⃣ AsyncStorage'dan Kullanıcı Verisini Yükle**
export const loadUserData = createAsyncThunk(
  "userData/loadUserData",
  async (_, { rejectWithValue }) => {
    try {
      // AsyncStorage'dan kullanıcı verisini al
      const userDataString = await AsyncStorage.getItem('userData');
      
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        return userData;
      } else {
        throw new Error("Kullanıcı verisi bulunamadı.");
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);


const initialState = { 
  userData: {
    gender: "",
    year: 0,
    goalSelection: "",
    activityLevel: "",
    sitUpCapacity: "",
    motivation: "",
    height: 0,
    weight: 0,
    workautDays: [],
    welcomeCompleted: false,
  },
  status: "idle",
  error: null,
};

export const dataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setGender: (state, action) => {
      state.userData.gender = action.payload;
    },
    setYear: (state, action) => {
      state.userData.year = action.payload;
    },
    setGoalSelection: (state, action) => {
      state.userData.goalSelection = action.payload;
    },
    setActivityLevel: (state, action) => {
      state.userData.activityLevel = action.payload;
    },
    setSitUpCapacity: (state, action) => {
      state.userData.sitUpCapacity = action.payload;
    },
    setMotivation: (state, action) => {
      state.userData.motivation = action.payload;
    },
    setHeight: (state, action) => {
      state.userData.height = action.payload;
    },
    setWeight: (state, action) => {
      state.userData.weight = action.payload;
    },
    setWorkautDays: (state, action) => {
      state.userData.workautDays = action.payload;
    },
    setWelcomeCompleted: (state, action) => {
      state.userData.welcomeCompleted = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadUserData.fulfilled, (state, action) => {
        if (action.payload) {
          state.userData = {
            ...action.payload,
            welcomeCompleted: action.payload.welcomeCompleted ?? false,
          };
        }
        state.status = "succeeded";
      })
      .addCase(loadUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  setActivityLevel,
  setGender,
  setGoalSelection,
  setYear,
  setMotivation,
  setSitUpCapacity,
  setHeight,
  setWeight,
  setWorkautDays,
  setWelcomeCompleted,
} = dataSlice.actions;

export default dataSlice.reducer;
