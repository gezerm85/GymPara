import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadUserData = createAsyncThunk(
  "userData/loadUserData",
  async (_, { rejectWithValue }) => {
    try {
      const jsonValue = await AsyncStorage.getItem("userData");
      if (jsonValue != null) {
        return JSON.parse(jsonValue);
      } else {
        return null;
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadUserData.fulfilled, (state, action) => {
        if (action.payload) {
          state.userData = action.payload;
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
} = dataSlice.actions;

export default dataSlice.reducer;
