// src/redux/trainingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchTrainingData = createAsyncThunk(
  'training/fetchTrainingData',
  async () => {
    const response = await fetch('/devicedata.json'); 
    return response.json();
  }
);

const trainingSlice = createSlice({
  name: 'training',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainingData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTrainingData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchTrainingData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default trainingSlice.reducer;
