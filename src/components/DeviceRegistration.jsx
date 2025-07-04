

// export default DeviceRegistrationForm;

import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, MenuItem, Typography, Paper, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addDevice, clearDeviceError, fetchMedicalDevices } from '../redux/registerDeviceSlice';
import { useNavigate } from 'react-router-dom';
import './styles/DeviceRegistration.scss';

const statusOptions = ['Active', 'Expired'];

const DeviceRegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { devices, medicalDevices, error, status } = useSelector(state => state.registerDevice);
  const allDevices = useSelector(state => state.devices.data);

  const [formData, setFormData] = useState({
    'Device Type': '',
    'Device ID': '',
    'Facility': '',
    'Status': '',
    'Battery %': '',
    'Last Service / Installation Date': '',
    'AMC/CMC Type': '',
    'Contract Start': '',
    'Contract End': '',
    'Days to Expiry': '',
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMedicalDevices());
    }
  }, [dispatch, status]);

  const calculateDaysToExpiry = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end - start;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysRemaining > 0 ? daysRemaining : 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'Contract Start' || name === 'Contract End') {
      const startDate = name === 'Contract Start' ? value : formData['Contract Start'];
      const endDate = name === 'Contract End' ? value : formData['Contract End'];

      if (startDate && endDate) {
        const daysRemaining = calculateDaysToExpiry(startDate, endDate);
        setFormData(prev => ({
          ...prev,
          [name]: value,
          'Days to Expiry': daysRemaining,
        }));
        return;
      }
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    dispatch(clearDeviceError());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const localDevices = medicalDevices || [];
    const inventoryDevices = allDevices || [];

    const isDuplicateLocal = inventoryDevices.some(device => device['Device ID'] === formData['Device ID']);
    const isDuplicateMedical = localDevices.some(device => device['Device ID'] === formData['Device ID']);

    if (isDuplicateLocal || isDuplicateMedical) {
      dispatch(clearDeviceError());
      return alert('Device ID must be unique');
    }

    dispatch(addDevice(formData));
    navigate('/devices');
  };

  return (
    <Box className="device-form-container">
      <Paper className="device-form-paper">
        <Typography variant="h5" gutterBottom>Device Registration</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit} className="device-form">
        <TextField
  select
  label="Device Type"
  name="Device Type"
  value={formData['Device Type']}
  onChange={handleChange}
  fullWidth
  required
>
  {['Sensor', 'Gateway', 'Camera'].map(option => (
    <MenuItem key={option} value={option}>{option}</MenuItem>
  ))}
</TextField>
          <TextField label="Device ID" name="Device ID" value={formData['Device ID']} onChange={handleChange} fullWidth required />
          <TextField label="Facility" name="Facility" value={formData['Facility']} onChange={handleChange} fullWidth required />
          
          <TextField select label="Status" name="Status" value={formData['Status']} onChange={handleChange} fullWidth required>
            {statusOptions.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
          </TextField>

          <TextField label="Battery %" name="Battery %" type="number" value={formData['Battery %']} onChange={handleChange} fullWidth required />

          <TextField
            label="Last Service / Installation Date"
            name="Last Service / Installation Date"
            type="date"
            value={formData['Last Service / Installation Date']}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
          />

<TextField
  select
  label="AMC/CMC Type"
  name="AMC/CMC Type"
  value={formData['AMC/CMC Type']}
  onChange={handleChange}
  fullWidth
  required
>
  <MenuItem value="AMC">AMC</MenuItem>
  <MenuItem value="CMC">CMC</MenuItem>
</TextField>

          <TextField
            label="Contract Start"
            name="Contract Start"
            type="date"
            value={formData['Contract Start']}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
          />

          <TextField
            label="Contract End"
            name="Contract End"
            type="date"
            value={formData['Contract End']}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
          />

          <TextField
            label="Days to Expiry"
            name="Days to Expiry"
            type="number"
            value={formData['Days to Expiry']}
            fullWidth
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button variant="contained" color="primary" type="submit">Register Device</Button>
            <Button variant="outlined" color="secondary" onClick={() => navigate('/')}>Cancel</Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default DeviceRegistrationForm;
