import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, firestoreDB } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

// **1️⃣ Firestore'dan Kullanıcı Verisini Yükle**
export const loadUserData = createAsyncThunk(
  "userData/loadUserData",
  async (_, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Kullanıcı bulunamadı.");

      // Firestore'dan kullanıcı verisini al
      const userDocRef = doc(firestoreDB, "users", user.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        let userData = docSnap.data();

        // 🔹 Firestore Timestamp -> Serileştirilebilir Date Formatına Dönüştür
        if (userData.createdAt) {
          userData.createdAt = userData.createdAt.toDate().toISOString(); // ISO formatında string
        }

        // Redux Store ve AsyncStorage'a kaydet
        await AsyncStorage.setItem("userData", JSON.stringify(userData));

        return userData;
      } else {
        throw new Error("Firestore'da kullanıcı verisi bulunamadı.");
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
