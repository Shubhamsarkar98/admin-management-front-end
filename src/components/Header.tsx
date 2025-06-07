import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { Menu as MenuIcon, Notifications } from '@mui/icons-material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';


const Header = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };

  return (
    <AppBar position="sticky" className="bg-white shadow-md">
      <Toolbar className="justify-between">
        <Box className="flex items-center">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            className="text-gray-700"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="text-gray-700 ml-2">
            Admin Dashboard
          </Typography>
        </Box>

        <Box className="flex items-center gap-4">
          <IconButton className="text-gray-700">
            <Notifications />
          </IconButton>
          <IconButton onClick={handleMenu} className="text-gray-700">
            <Avatar className="h-8 w-8 bg-blue-500">A</Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;