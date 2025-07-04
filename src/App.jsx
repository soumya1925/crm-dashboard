import React from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Sidebar from './components/Sidebar';
import Header from './components/Header';

import DevicesInventory from './components/DevicesInventory';
import TrainingModule from './components/TrainingModule';
import ServiceVisits from './components/ServiceVisits';
import TrackerAlerts from './components/TrackerAlerts';
import AMCTracker from './components/AMCTracker';
import Dashboard from './components/Dashboard';
import Assignments from './components/Assignments';
import LoginPage from './components/LoginPage';
import DeviceRegistration from './components/DeviceRegistration';


import TrainingModuleForm from './components/technician/TrainingModuleForm';

import '../src/components/styles/components.scss';
import DashboardTechnician from './components/technician/DashboardTechnician';

export default function App() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const role = useSelector((state) => state.auth.role);

  return (
    <Router>
      {role && ( // Sidebar only shows if logged in
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <Sidebar isMobile={isMobile} />

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              transition: 'margin 0.3s ease, width 0.3s ease',
            }}
          >
            <Header isMobile={isMobile} />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '100%',
                maxWidth: '100%',
              }}
            >
              <Routes>
                <Route path="/" element={role === 'technician' ? <DashboardTechnician/>:<Dashboard/>} />
                {role !== 'technician' && (
      <Route path="/devices" element={<DevicesInventory />} />
    )}
                <Route path="/training" element={role === 'technician' ? <TrainingModuleForm /> : <TrainingModule />} />
                <Route path="/service" element={<ServiceVisits />} />
                <Route path="/tracker" element={<AMCTracker />} />
                <Route path="/alerts" element={<TrackerAlerts />} />
                <Route path="/assignments" element={<Assignments />} />
                <Route path="/device-registration" element={<DeviceRegistration />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      )}

      {/* Show Login Page if not logged in */}
      {!role && (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}
