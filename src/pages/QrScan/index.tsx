import { Box, Button, Paper, Typography, Stack } from '@mui/material';
import { FormInputTextField } from '../../components/FormElements';
import { useForm } from 'react-hook-form';
import { generateQRCodeThunk } from '../../redux/qrSlice';
import { useAppDispatch } from '../../main';
import QrCodeIcon from '@mui/icons-material/QrCode';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  url: string;
}

const QrScanner = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    dispatch(generateQRCodeThunk(data.url));
    navigate('/qrcode');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          maxWidth: '500px',
          width: '100%',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <QrCodeIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h5" component="h1" gutterBottom>
            QR Code Generator
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Enter a URL to generate its QR code
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <FormInputTextField
            control={control}
            name="url"
            label="Enter URL"
            placeholder="https://example.com"
            rules={{ 
              required: 'URL is required',
              pattern: {
                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                message: 'Please enter a valid URL'
              }
            }}
            fullWidth
            sx={{ mb: 3 }}
          />
          <Stack spacing={2}>
            <Button 
              type="submit"
              variant="contained" 
              color="primary"
              fullWidth
              size="large"
              startIcon={<QrCodeIcon />}
              sx={{
                borderRadius: 2,
                py: 1.5,
                textTransform: 'none',
                fontSize: '1.1rem'
              }}
            >
              Generate QR Code
            </Button>
            <Button 
              variant="outlined" 
              color="secondary"
              fullWidth
              size="large"
              startIcon={<QrCodeScannerIcon />}
              onClick={() => navigate('/qrcode')}
              sx={{
                borderRadius: 2,
                py: 1.5,
                textTransform: 'none',
                fontSize: '1.1rem'
              }}
            >
              View QR Scanner
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default QrScanner;