import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Table, TableBody, TableCell, TableHead, TableRow, MenuItem, Select, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { assignTask, saveGeneratedTicket } from '../redux/technicianSlice';
import { addServiceVisit } from '../redux/serviceVisitsSlice';

const TechnicianTable = () => {
  const dispatch = useDispatch();
  const technicians = useSelector((state) => state.technician.technicians);
  const deviceIssues = JSON.parse(localStorage.getItem('deviceIssues')) || [];

  const [selectedDevice, setSelectedDevice] = useState('');

  const generateVisitID = () => {
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    const newID = `VIS-${(tickets.length + 1).toString().padStart(5, '0')}`;
    return newID;
  };
  
  const handleAssign = (email) => {
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
  
    // Check if the device is already assigned
    const isDeviceAlreadyAssigned = tickets.some(ticket => ticket.deviceID === selectedDevice);
  
    if (isDeviceAlreadyAssigned) {
      alert('This device is already assigned to another technician.');
      return;
    }
  
    const deviceDetails = deviceIssues.find(device => device['Device ID'] === selectedDevice);
  
    if (!deviceDetails) {
      alert('Device details not found.');
      return;
    }
  
    const visitID = generateVisitID();
    const technician = technicians.find(tech => tech.email === email);
  
    const ticket = {
      ...deviceDetails,
      deviceID: selectedDevice,
      technicianEmail: email,
      technicianName: technician.name, 
      visitID: visitID,
      assignmentDate: new Date().toISOString(),
    };
  
  
    dispatch(assignTask(email));
    dispatch(saveGeneratedTicket(ticket));
  
    alert(`Task assigned! Visit ID: ${visitID}`);
  };
  

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>Select Device (with issues)</Typography>
      <Paper sx={{ p: 2, mb: 2, maxWidth: 300 }}>
        <Select
          value={selectedDevice}
          onChange={(e) => setSelectedDevice(e.target.value)}
          fullWidth
          displayEmpty
          MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }} // Scrollable
        >
          <MenuItem value="" disabled>Select Device ID</MenuItem>
          {deviceIssues.map((device, idx) => (
            <MenuItem key={idx} value={device['Device ID']}>
              {device['Device ID']}
            </MenuItem>
          ))}
        </Select>
      </Paper>

      {selectedDevice && (
        <>
          <Typography variant="h6" gutterBottom>Available Technicians</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Work Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {technicians.map((tech, idx) => (
                <TableRow key={idx}>
                  <TableCell>{tech.name}</TableCell>
                  <TableCell>{tech.email}</TableCell>
                  <TableCell>{tech.workstatus}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={tech.workstatus !== 'available'}
                      onClick={() => handleAssign(tech.email)}
                    >
                      Assign Task
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </Box>
  );
};

export default TechnicianTable;
