

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to load data from localStorage or JSON
export const fetchTrackerAlerts = createAsyncThunk(
  'trackerAlerts/fetchTrackerAlerts',
  async () => {
   
    let localData = localStorage.getItem('devicedata');
    let parsedData = [];

    if (localData) {
      try {
        parsedData = JSON.parse(localData);
      } catch (err) {
        console.error('Error parsing localStorage devicedata:', err);
        parsedData = [];
      }
    }

   
    if (!parsedData || parsedData.length === 0) {
      const response = await fetch('/devicedata.json');
      parsedData = await response.json();
      localStorage.setItem('devicedata', JSON.stringify(parsedData));
    }

    
    const filteredData = parsedData.filter(device => 
      device.deviceStatus !== 'Online' && device['Visit ID']
    );
    return filteredData;
  }
);

const trackerAlertsSlice = createSlice({
  name: 'trackerAlerts',
  initialState: {
    data: [],
    filters: [],
  },
  reducers: {
    setTrackerAlertsFilters: (state, action) => {
      state.filters = action.payload;
    },

    updateDeviceStatus: (state, action) => {
      const { id, newStatus } = action.payload;

      // Update state data
      const index = state.data.findIndex(d => d.id === id);
      if (index !== -1) {
        state.data[index].Status = newStatus;
      }

      // Update in localStorage
      const fullDeviceList = JSON.parse(localStorage.getItem('devicedata')) || [];
      const deviceIndex = fullDeviceList.findIndex(d => d.id === id);

      if (deviceIndex !== -1) {
        fullDeviceList[deviceIndex].Status = newStatus;
        localStorage.setItem('devicedata', JSON.stringify(fullDeviceList));
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTrackerAlerts.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const { setTrackerAlertsFilters, updateDeviceStatus } = trackerAlertsSlice.actions;
export default trackerAlertsSlice.reducer;
