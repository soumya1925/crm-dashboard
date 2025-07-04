


import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../redux/sidebarSlice';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import './styles/components.scss';

export default function Header({ handleDrawerToggle, isMobile }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const role = useSelector(state => state.auth.role);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <AppBar position="static" className="header" elevation={0}>
      <Toolbar className="header-toolbar">
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => dispatch(toggleSidebar())}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
       <Typography variant="h6" noWrap component="div">
      {role === 'admin' ? 'Admin Dashboard' : 'Technician Dashboard'}
    </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {/* User Icon & Role */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
          <AccountCircleIcon />
          <Typography variant="body1" component="span">
            {role?.toUpperCase()}
          </Typography>
        </Box>

        {/* Logout Button */}
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
