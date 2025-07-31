import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firestoreDB, auth } from "../firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export const loadUserExercises = createAsyncThunk(
  "userExercises/loadUserExercises",
  async (_, { rejectWithValue }) => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) return [];
      const q = query(collection(firestoreDB, "user_exercises"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const logs = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        logs.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt && data.createdAt.toDate ? data.createdAt.toDate().toISOString() : null,
        });
      });
      return logs;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const userExercisesSlice = createSlice({
  name: "userExercises",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUserExercises.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadUserExercises.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(loadUserExercises.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default userExercisesSlice.reducer; 