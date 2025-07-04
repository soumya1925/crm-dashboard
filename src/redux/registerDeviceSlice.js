


// In registerDeviceSlice.js


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { setDevices } from './deviceSlice'; // sync with deviceSlice

// Fetch medical devices and store in localStorage 'devicedata'
export const fetchMedicalDevices = createAsyncThunk(
  'registerDevice/fetchMedicalDevices',
  async () => {
    const response = await fetch('/devicedata.json');
    const data = await response.json();
    localStorage.setItem('devicedata', JSON.stringify(data)); 
    return data;
  }
);


export const addDevice = createAsyncThunk(
  'registerDevice/addDevice',
  async (device, { getState, dispatch, rejectWithValue }) => {
    const { registerDevice } = getState();

    const isDuplicateLocal = registerDevice.medicalDevices.some(d => d['Device ID'] === device['Device ID']);

    if (isDuplicateLocal) {
      return rejectWithValue('Device ID must be unique');
    }

    // Update devicedata in localStorage
    const existingDevices = JSON.parse(localStorage.getItem('devicedata')) || [];
    const updatedDevices = [...existingDevices, device];
    localStorage.setItem('devicedata', JSON.stringify(updatedDevices));

    // ✅ Sync device inventory
    dispatch(addDeviceToInventory(device));

    return device; // Only return the new device since deviceSlice handles full state
  }
);

const storedMedicalDevices = JSON.parse(localStorage.getItem('devicedata')) || [];

const registerDeviceSlice = createSlice({
  name: 'registerDevice',
  initialState: {
    medicalDevices: storedMedicalDevices, 
    error: null,
    status: 'idle',
  },
  reducers: {
    updateDeviceList: (state) => {
      const localDevices = JSON.parse(localStorage.getItem('devicedata')) || [];
      state.medicalDevices = localDevices;
    },
    clearDeviceError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedicalDevices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMedicalDevices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.medicalDevices = action.payload;
      })
      .addCase(fetchMedicalDevices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addDevice.fulfilled, (state, action) => {
        state.medicalDevices = action.payload; // 
        state.error = null;
      })
      .addCase(addDevice.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export const { updateDeviceList, clearDeviceError } = registerDeviceSlice.actions;

export default registerDeviceSlice.reducer;
