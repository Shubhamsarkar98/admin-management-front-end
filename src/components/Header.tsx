import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import {  Logout as LogoutIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { selectUser } from '../redux/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="sticky" className="bg-white shadow-md">
      <Toolbar className="justify-between">
        <Box className="flex items-center">
          <Typography variant="h6" className="text-gray-700 ml-2">
            Admin Dashboard
          </Typography>
        </Box>

        <Box className="flex items-center gap-4">
          <Typography variant="subtitle1" className="text-gray-700">
            {((user as any)?.firstName && (user as any)?.lastName)
              ? `${(user as any).firstName} ${(user as any).lastName}`
              : 'User'}
          </Typography>
          <Button
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            color="inherit"
            className="text-gray-700"
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;