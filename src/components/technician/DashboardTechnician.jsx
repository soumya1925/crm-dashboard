import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { loadTickets } from '../../redux/ticketSlice';

const DashboardTechnician = () => {
  const dispatch = useDispatch();
  const { assignedTicket, status } = useSelector(state => state.tickets);
  const technician = useSelector(state => state.auth.user);

  useEffect(() => {
    if (technician?.name) {
      dispatch(loadTickets());
    }
  }, [dispatch, technician]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
      <Card
        sx={{
          backgroundColor: assignedTicket ? '#FFF176' : '#e0e0e0', // yellow or grey
          width: 400,
          p: 2,
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {assignedTicket
              ? 'A Ticket Has Been Assigned To You'
              : 'No Tickets Have Been Assigned To You'}
          </Typography>

          {assignedTicket && (
            <>
              <Typography><strong>Visit ID:</strong> {assignedTicket.visitID}</Typography>
              <Typography><strong>Visit Notes:</strong> {assignedTicket['Visit Notes']}</Typography>
              <Typography><strong>Assignment Date:</strong> {assignedTicket.assignmentDate}</Typography>
              <Typography><strong>Device ID:</strong> {assignedTicket.deviceID}</Typography>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default DashboardTechnician;
