import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box className="bg-white shadow-md py-4 px-6">
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} Admin Dashboard. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;