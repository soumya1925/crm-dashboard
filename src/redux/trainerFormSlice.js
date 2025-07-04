

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { saveState } from '../utils/localStorage';

export const loadTickets = createAsyncThunk(
  'trainerForm/loadTickets',
  async (_, { getState, rejectWithValue }) => {
    const globalState = getState();
    const currentTechnician = globalState.auth?.user?.name;

    if (!currentTechnician) {
      return rejectWithValue('Technician is not logged in.');
    }

    const storedTickets = localStorage.getItem('tickets');
    if (!storedTickets) {
      return rejectWithValue('No ticket data found.');
    }

    const ticketList = JSON.parse(storedTickets);
    const assignedTicket = ticketList.find(
      (ticket) => ticket.technicianName === currentTechnician
    );

    if (!assignedTicket) {
      return rejectWithValue('No ticket assigned to the current technician.');
    }

    return assignedTicket;
  }
);

const trainerFormSlice = createSlice({
  name: 'trainerForm',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addFormEntry: (state, action) => {
      const newRecord = { ...action.payload, id: uuidv4() };
      state.data.push(newRecord);
      saveState('trainerForm', { data: state.data });

      const devicedataRaw = localStorage.getItem('devicedata');
      let devicedata = devicedataRaw ? JSON.parse(devicedataRaw) : [];

      const index = devicedata.findIndex(
        (device) => device['Device ID'] === action.payload.DeviceID
      );

      const fieldsToUpdate = {
        'Device ID': action.payload.DeviceID,
        'Facility': action.payload.Facility,
        'Purpose': action.payload.Purpose,
        'Visit Notes': action.payload.VisitNotes,
        'Issue Reported': action.payload.IssueReported,
        'Issue Status': action.payload.IssueStatus,
        'Alert Raised To': action.payload.AlertRaisedTo,
        'Notes': action.payload.Notes,
      };

      if (index !== -1) {
        devicedata[index] = {
          ...devicedata[index],
          ...fieldsToUpdate,
        };
      } else {
        devicedata.push(fieldsToUpdate);
      }

      localStorage.setItem('devicedata', JSON.stringify(devicedata));
    },

    updateFormEntry: (state, action) => {
      const index = state.data.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = { ...action.payload };
        saveState('trainerForm', { data: state.data });
      }
    },

    deleteFormEntry: (state, action) => {
      state.data = state.data.filter(item => item.id !== action.payload);
      saveState('trainerForm', { data: state.data });
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadTickets.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadTickets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.data = [{ ...action.payload, id: uuidv4() }];
        saveState('trainerForm', { data: state.data });
      })
      .addCase(loadTickets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const {
  addFormEntry,
  updateFormEntry,
  deleteFormEntry
} = trainerFormSlice.actions;

export default trainerFormSlice.reducer;
