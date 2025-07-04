// src/store/dashDataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDashData = createAsyncThunk(
  'dashData/fetchDashData',
  async (_, { rejectWithValue }) => {
    const localData = localStorage.getItem('devicedata');
    if (localData) {
      return JSON.parse(localData);
    }

    try {
      const response = await fetch('/devicedata.json');
      if (!response.ok) throw new Error('Failed to load device data');
      const data = await response.json();
      localStorage.setItem('devicedata', JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const dashDataSlice = createSlice({
  name: 'dashData',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchDashData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchDashData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default dashDataSlice.reducer;
