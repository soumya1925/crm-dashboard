

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch device data
export const fetchDevices = createAsyncThunk('devices/fetchDevices', async () => {
  // Try to load from localStorage first
  const localData = JSON.parse(localStorage.getItem('devicedata'));
  if (localData && localData.length > 0) {
    return localData; // Load persisted data
  }

  // Otherwise, fetch from devicedata.json
  const response = await fetch('/devicedata.json');
  const deviceData = await response.json();
  localStorage.setItem('devicedata', JSON.stringify(deviceData)); // Sync localStorage
  return deviceData;
});

const deviceSlice = createSlice({
  name: 'devices',
  initialState: {
    data: [],
    filters: { status: '', amcStatus: '', deviceType: '' },
    loading: false,
    error: null,
  },
  reducers: {
    addDeviceToInventory(state, action) {
      state.data.push(action.payload);
      localStorage.setItem('devicedata', JSON.stringify(state.data)); // Keep localStorage updated
    },
    setFilter(state, action) {
      const { key, value } = action.payload;
      if (key in state.filters) {
        state.filters[key] = value;
      }
    },
    clearFilters(state) {
      Object.keys(state.filters).forEach(key => {
        state.filters[key] = '';
      });
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDevices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDevices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addDeviceToInventory, setFilter, clearFilters } = deviceSlice.actions;

export default deviceSlice.reducer;
