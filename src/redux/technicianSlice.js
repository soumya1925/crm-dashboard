import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch roleData.json
export const fetchTechnicians = createAsyncThunk(
  'technician/fetchTechnicians',
  async () => {
    const response = await fetch('/roleData.json');
    const data = await response.json();
    const technicians = data.filter(user => user.role === 'technician');
    localStorage.setItem('roleData', JSON.stringify(data));
    return technicians;
  }
);

// Async thunk to fetch device issues
export const fetchDeviceIssues = createAsyncThunk(
  'technician/fetchDeviceIssues',
  async () => {
    const response = await fetch('/devicedata.json');
    const data = await response.json();

    // Filter devices with 'Maintenance' or 'Offline' status
    const filteredDevices = data.filter(device =>
      device.Status === 'Offline' || device.Status === 'Maintenance'
    );

    localStorage.setItem('deviceIssues', JSON.stringify(filteredDevices));
    return filteredDevices;
  }
);

const initialState = {
  technicians: [],
  status: 'idle',
  error: null,
  deviceIssues: [],
};

const technicianSlice = createSlice({
  name: 'technician',
  initialState,
  reducers: {
    assignTask: (state, action) => {
      const index = state.technicians.findIndex(
        tech => tech.email === action.payload
      );
      if (index !== -1) {
        state.technicians[index].workstatus = 'assigned task';
      }

      const allUsers = JSON.parse(localStorage.getItem('roleData')) || [];
      const updatedUsers = allUsers.map(user =>
        user.email === action.payload ? { ...user, workstatus: 'unavailable' } : user
      );
      localStorage.setItem('roleData', JSON.stringify(updatedUsers));
    },
    saveGeneratedTicket: (state, action) => {
      const existingTickets = JSON.parse(localStorage.getItem('tickets')) || [];
      const updatedTickets = [...existingTickets, action.payload];
      localStorage.setItem('tickets', JSON.stringify(updatedTickets));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTechnicians.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTechnicians.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.technicians = action.payload;
      })
      .addCase(fetchTechnicians.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchDeviceIssues.fulfilled, (state, action) => {
        state.deviceIssues = action.payload;
      });
  },
});

export const { assignTask, saveGeneratedTicket } = technicianSlice.actions;

export default technicianSlice.reducer;
