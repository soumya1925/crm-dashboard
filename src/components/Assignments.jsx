import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTechnicians ,fetchDeviceIssues } from '../redux/technicianSlice';
import TechnicianTable from './TechnicianTable';
import { useNavigate } from 'react-router-dom';

const COLORS = ['#4CAF50', '#F44336', '#FF9800']; // Available, Unavailable, Assigned

const Assignments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { technicians, status, error } = useSelector((state) => state.technician);

  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTechnicians());
    }
    
    dispatch(fetchDeviceIssues());
  }, [status, dispatch]);

  if (status === 'loading') return <p>Loading technicians...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  
  const availableCount = technicians.filter(t => t.workstatus === 'available').length;
  const unavailableCount = technicians.filter(t => t.workstatus === 'unavailable').length;
  const assignedCount = technicians.filter(t => t.workstatus === 'assigned task').length;

  const availability = [
    { name: 'Available', value: availableCount },
    { name: 'Unavailable', value: unavailableCount },
    { name: 'Assigned Task', value: assignedCount }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Technician Assignments & Availability</Typography>

      <Paper sx={{ p: 3, mb: 4, boxShadow: 3 }}>
        <Typography variant="h6" gutterBottom>Total Technicians: {technicians.length}</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={availability}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              label
            >
              {availability.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Paper>

      <Grid container spacing={2}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => navigate('/device-registration')}>
            Device Registration
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" onClick={() => setShowTable(true)}>
            Generate Ticket
          </Button>
        </Grid>
      </Grid>

      {showTable && <TechnicianTable />}
    </Box>
  );
};

export default Assignments;
