import React from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Button
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar, closeSidebar } from '../redux/sidebarSlice';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DevicesIcon from '@mui/icons-material/Devices';
import SchoolIcon from '@mui/icons-material/School';
import BuildIcon from '@mui/icons-material/Build';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

export default function Sidebar({ isMobile }) {
  const dispatch = useDispatch();
  const mobileOpen = useSelector((state) => state.sidebar.isOpen);
  const role = useSelector((state) => state.auth.role); // <-- get role

  const allMenuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Devices Inventory', icon: <DevicesIcon />, path: '/devices' },
    { text: 'Training Module', icon: <SchoolIcon />, path: '/training' },
    { text: 'Service Visits', icon: <BuildIcon />, path: '/service' },
    { text: 'Tracker', icon: <AssignmentTurnedInIcon />, path: '/tracker' },
    { text: 'Alerts', icon: <NotificationsActiveIcon />, path: '/alerts' },
    { text: 'Assignments', icon: <AssignmentIcon />, path: '/assignments' }
  ];

  // 🔒 Filter menu items based on role
  const menuItems = role === 'technician'
    ? allMenuItems.filter(item => ['Dashboard', 'Training Module'].includes(item.text))
    : allMenuItems;

  const drawerContent = (
    <>
      <Toolbar />
      <div className="logo">
        <h2>Matri</h2>
      </div>
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            onClick={isMobile ? () => dispatch(toggleSidebar()) : undefined}
            className="sidebar-item"
          >
            <ListItemIcon className="sidebar-icon">{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>

      {isMobile && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<CloseIcon />}
          onClick={() => dispatch(closeSidebar())}
          sx={{ margin: 2 }}
        >
          Close Menu
        </Button>
      )}
    </>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => dispatch(toggleSidebar())}
        ModalProps={{ keepMounted: true }}
        className="sidebar"
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      open
      className="sidebar"
    >
      {drawerContent}
    </Drawer>
  );
}
