


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch service visits
export const fetchServiceVisits = createAsyncThunk(
  'serviceVisits/fetchServiceVisits',
  async () => {
    
    const localDeviceData = localStorage.getItem('devicedata');
    let deviceData = [];

    if (localDeviceData) {
      try {
        const parsed = JSON.parse(localDeviceData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          deviceData = parsed;
        }
      } catch (e) {
        console.error('Failed to parse devicedata from localStorage:', e);
      }
    }

   
    if (deviceData.length === 0) {
      const response = await fetch('/devicedata.json');
      deviceData = await response.json();

      // Store in localStorage for future use
      localStorage.setItem('devicedata', JSON.stringify(deviceData));
    }

    // Load previously generated tickets from localStorage
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];

    // Create a lookup table for Visit ID -> technicianName
    const ticketLookup = {};
    tickets.forEach(ticket => {
      if (ticket['Visit ID']) {
        ticketLookup[ticket['Visit ID']] = ticket.technicianName;
      }
    });

    // Filter devices: not Online and Visit ID is not empty/null
    const filteredDevices = deviceData
      .filter(device => device.Status !== 'Online' && device['Visit ID'])
      .map(device => ({
        ...device,
        'Responsible Engineer': ticketLookup[device['Visit ID']] || device['Responsible Engineer'] || '',
      }));

    // Update ticket fields
    const updatedTickets = tickets.map(ticket => ({
      ...ticket,
      'Responsible Engineer': ticket.technicianName,
      'Purpose': '',
      'Visit Notes': '',
      'Attachments': '',
    }));

    // Merge and return
    return [...filteredDevices, ...updatedTickets];
  }
);

// Create slice
const serviceVisitsSlice = createSlice({
  name: 'serviceVisits',
  initialState: {
    data: [],
    filters: [],
  },
  reducers: {
    setServiceVisitsFilters: (state, action) => {
      state.filters = action.payload;
    },
    addServiceVisit: (state, action) => {
      // Add the new ticket to Redux store
      state.data.push(action.payload);

      // Save the ticket to localStorage
      const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
      tickets.push(action.payload);
      localStorage.setItem('tickets', JSON.stringify(tickets));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchServiceVisits.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

// Export actions (named exports)
export const { setServiceVisitsFilters, addServiceVisit } = serviceVisitsSlice.actions;

// Export reducer (default export)
export default serviceVisitsSlice.reducer;