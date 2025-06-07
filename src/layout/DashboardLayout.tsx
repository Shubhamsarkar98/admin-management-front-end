import { Box } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box className="flex flex-col min-h-screen">
      <Header />
      <Box component="main" className="flex-grow bg-gray-50 p-6">
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default DashboardLayout;