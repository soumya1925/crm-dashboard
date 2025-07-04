import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './sidebarSlice';
import deviceReducer from './deviceSlice';
import serviceVisitsReducer from './serviceVisitsSlice';
import amcTrackerReducer from './amcTrackerSlice';
import trackerAlertsReducer from './trackerAlertsSlice';
import authReducer from './authSlice';
import trainingReducer from './trainingSlice';
import technicianReducer from './technicianSlice';
import registerDeviceReducer from './registerDeviceSlice';

import ticketReducer from './ticketSlice'
import trainerFormReducer from './trainerFormSlice';
import dashDataReducer from './dashDataSlice';


const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    dashData: dashDataReducer,
    devices: deviceReducer,
    training: trainingReducer,
    serviceVisits: serviceVisitsReducer,
    amcTracker: amcTrackerReducer,
    trackerAlerts: trackerAlertsReducer,
    technician: technicianReducer,
    auth: authReducer,
    registerDevice: registerDeviceReducer,


    trainerForm: trainerFormReducer, 
    tickets: ticketReducer,
    },
});

export default store;
