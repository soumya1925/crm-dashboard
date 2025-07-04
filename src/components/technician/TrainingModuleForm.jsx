
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFormEntry, loadTickets } from '../../redux/trainerFormSlice';
import {
  Button, TextField, Grid, Typography, Box, Paper
} from '@mui/material';
import '../styles/trainerForm.scss';

const TrainerForm = () => {
  const dispatch = useDispatch();

  const ticketData = useSelector(state => state.trainerForm.data?.[0] || null);
  const status = useSelector(state => state.trainerForm.status);

  const [formData, setFormData] = useState({
    DeviceType: '',
    DeviceID: '',
    Facility: '',
    Purpose: '',
    VisitNotes: '',
    Attachments: '',
    IssueReported: '',
    IssueStatus: '',
    PhotosUploaded: '',
    AlertRaisedTo: '',
    Notes: '',
  });

  useEffect(() => {
    dispatch(loadTickets());
  }, [dispatch]);

  useEffect(() => {
    if (ticketData) {
      setFormData({
        DeviceType: ticketData['Device Type'] || '',
        DeviceID: ticketData['Device ID'] || '',
        Facility: ticketData['Facility'] || '',
        Purpose: '',
        VisitNotes: '',
        Attachments: '',
        IssueReported: '',
        IssueStatus: '',
        PhotosUploaded: '',
        AlertRaisedTo: '',
        Notes: '',
      });
    }
  }, [ticketData]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0]?.name || '' : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!ticketData) {
      alert('No ticket has been assigned to you.');
      return;
    }

    const requiredFields = [
      'DeviceType',
      'DeviceID',
      'Facility',
      'Purpose',
      'VisitNotes',
      'IssueReported',
      'IssueStatus',
      'AlertRaisedTo',
      'Notes'
    ];

    const missingFields = requiredFields.filter(field => !formData[field]?.trim());

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields:\n${missingFields.join(', ')}`);
      return;
    }

    dispatch(addFormEntry(formData));
    alert('Training data submitted successfully!');
  };

  if (status === 'loading') {
    return (
      <Box className="trainer-form-container">
        <Paper elevation={4} className="trainer-form-paper">
          <Typography variant="h6" textAlign="center">
            Loading ticket...
          </Typography>
        </Paper>
      </Box>
    );
  }

  if (!ticketData) {
    return (
      <Box className="trainer-form-container">
        <Paper elevation={4} className="trainer-form-paper">
          <Typography variant="h6" textAlign="center" color="error">
            No ticket has been assigned to you.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box className="trainer-form-container">
      <Paper elevation={4} className="trainer-form-paper">
        <Typography variant="h5" gutterBottom textAlign="center">
          Technician Training Module Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} direction="column">
            {/* Read-only Fields */}
            <Grid item>
              <TextField fullWidth label="Device Type" name="DeviceType" value={formData.DeviceType} InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item>
              <TextField fullWidth label="Device ID" name="DeviceID" value={formData.DeviceID} InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item>
              <TextField fullWidth label="Facility" name="Facility" value={formData.Facility} InputProps={{ readOnly: true }} />
            </Grid>

            {/* Editable Fields */}
            <Grid item>
              <TextField fullWidth required label="Purpose" name="Purpose" value={formData.Purpose} onChange={handleChange} />
            </Grid>
            <Grid item>
              <TextField fullWidth required label="Visit Notes" name="VisitNotes" value={formData.VisitNotes} onChange={handleChange} multiline rows={3} />
            </Grid>
            <Grid item>
              <Button variant="outlined" component="label" fullWidth>
                Upload Attachment (Optional)
                <input type="file" hidden name="Attachments" onChange={handleChange} />
              </Button>
              {formData.Attachments && (
                <Typography variant="body2" mt={1}>Uploaded: {formData.Attachments}</Typography>
              )}
            </Grid>
            <Grid item>
              <TextField fullWidth required label="Issue Reported" name="IssueReported" value={formData.IssueReported} onChange={handleChange} multiline rows={2} />
            </Grid>
            <Grid item>
              <TextField fullWidth required label="Issue Status" name="IssueStatus" value={formData.IssueStatus} onChange={handleChange} />
            </Grid>
            <Grid item>
              <Button variant="outlined" component="label" fullWidth>
                Upload Photo (Optional)
                <input type="file" hidden name="PhotosUploaded" onChange={handleChange} />
              </Button>
              {formData.PhotosUploaded && (
                <Typography variant="body2" mt={1}>Uploaded: {formData.PhotosUploaded}</Typography>
              )}
            </Grid>
            <Grid item>
              <TextField fullWidth required label="Alert Raised To" name="AlertRaisedTo" value={formData.AlertRaisedTo} onChange={handleChange} />
            </Grid>
            <Grid item>
              <TextField fullWidth required label="Notes" name="Notes" value={formData.Notes} onChange={handleChange} multiline rows={2} />
            </Grid>

            <Grid item>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Submit Training Data
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default TrainerForm;


