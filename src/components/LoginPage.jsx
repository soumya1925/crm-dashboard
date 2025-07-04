

// LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, fetchRoles } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, error, roleData, status } = useSelector((state) => state.auth);

  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Load role data on mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRoles());
    }
  }, [dispatch, status]);

  // Navigate on successful login
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Show alert if error
  useEffect(() => {
    if (error) {
      alert('Invalid credentials entered');
    }
  }, [error]);

  // Optional debug log

  const handleLogin = () => {
    if (role && name && email && password) {
      dispatch(login({ name, email, password, role }));
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 300,
        margin: 'auto',
        marginTop: 10
      }}
    >
      <Typography variant="h5" textAlign="center">
        Login
      </Typography>

      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel>Select Role</InputLabel>
        <Select
          value={role}
          label="Select Role"
          onChange={(e) => setRole(e.target.value)}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="technician">Technician</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        onClick={handleLogin}
        disabled={!role || !email || !password || !name}
      >
        Login
      </Button>
    </Box>
  );
}
