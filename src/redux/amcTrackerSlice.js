


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Async fetch from localStorage
// export const fetchAMCTrackerDataFromLocal = createAsyncThunk(
//   'amcTracker/fetchAMCTrackerDataFromLocal',
//   async () => {
//     const localData = JSON.parse(localStorage.getItem('devicedata'));
//     return localData || []; // Return an empty array if no data is found
//   }
// );

// const amcTrackerSlice = createSlice({
//   name: 'amcTracker',
//   initialState: {
//     data: [],
//     filters: [],
//   },
//   reducers: {
//     setAMCTrackerFilters: (state, action) => {
//       state.filters = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchAMCTrackerDataFromLocal.fulfilled, (state, action) => {
//       state.data = action.payload;
//     });
//   },
// });

// export const { setAMCTrackerFilters } = amcTrackerSlice.actions;
// export default amcTrackerSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async fetch from localStorage
export const fetchAMCTrackerDataFromLocal = createAsyncThunk(
  'amcTracker/fetchAMCTrackerDataFromLocal',
  async () => {
    const localData = JSON.parse(localStorage.getItem('devicedata'));
    return localData || [];
  }
);

const calculateDaysToExpiry = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDiff = end - start;
  const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return daysRemaining > 0 ? daysRemaining : 0;
};

const amcTrackerSlice = createSlice({
  name: 'amcTracker',
  initialState: {
    data: [],
    filters: [],
  },
  reducers: {
    setAMCTrackerFilters: (state, action) => {
      state.filters = action.payload;
    },
    syncAMCTrackerData: (state) => {
      const localData = JSON.parse(localStorage.getItem('devicedata')) || [];
      const updatedData = localData.map(device => {
        const daysToExpiry = calculateDaysToExpiry(device['Contract Start'], device['Contract End']);
        return {
          ...device,
          'Days to Expiry': daysToExpiry,
          'Contract Status': daysToExpiry > 0 ? 'Active' : 'Expired',
        };
      });
      state.data = updatedData;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAMCTrackerDataFromLocal.fulfilled, (state, action) => {
      state.data = action.payload.map(device => {
        const daysToExpiry = calculateDaysToExpiry(device['Contract Start'], device['Contract End']);
        return {
          ...device,
          'Days to Expiry': daysToExpiry,
          'Contract Status': daysToExpiry > 0 ? 'Active' : 'Expired',
        };
      });
    });
  },
});

export const { setAMCTrackerFilters, syncAMCTrackerData } = amcTrackerSlice.actions;
export default amcTrackerSlice.reducer;
