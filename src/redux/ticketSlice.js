// redux/ticketSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to load tickets from localStorage
export const loadTickets = createAsyncThunk(
  'tickets/loadTickets',
  async (_, { getState }) => {
    const state = getState();
    const technicianName = state.auth?.user?.name;

    const ticketsJSON = localStorage.getItem('tickets');
    if (!ticketsJSON || !technicianName) return null;

    const allTickets = JSON.parse(ticketsJSON);
    const matched = allTickets.find(ticket => ticket.technicianName === technicianName);

    return matched || null;
  }
);

const ticketSlice = createSlice({
  name: 'tickets',
  initialState: {
    assignedTicket: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearTicket: (state) => {
      state.assignedTicket = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTickets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadTickets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.assignedTicket = action.payload;
      })
      .addCase(loadTickets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearTicket } = ticketSlice.actions;
export default ticketSlice.reducer;
