import React, { useEffect } from 'react';
import { Box, Paper, Typography, CircularProgress, Button, Stack } from '@mui/material';
import { getLatestQRCodeThunk, selectQrCode, selectQrLoading, selectQrError } from '../../redux/qrSlice';
import { useAppDispatch, useAppSelector } from '../../main';
import { useNavigate } from 'react-router-dom';
import QrCodeIcon from '@mui/icons-material/QrCode';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Scanner = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const qrCode = useAppSelector(selectQrCode);
  const loading = useAppSelector(selectQrLoading);
  const error = useAppSelector(selectQrError);

  useEffect(() => {
    dispatch(getLatestQRCodeThunk());
  }, [dispatch]);

  const handleWhatsAppShare = () => {
    if (qrCode) {
      const message = `Check out this QR Code: ${qrCode.url}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
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
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" gutterBottom>
          QR Code Scanner Results
        </Typography>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Typography color="error" sx={{ my: 2 }}>
            {error}
          </Typography>
        )}

        {qrCode && (
          <Box sx={{ mt: 3 }}>
            <img 
              src={qrCode.qrCodeDataUrl} 
              alt="QR Code"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            <Typography variant="body1" sx={{ mt: 2 }}>
              URL: {qrCode.url}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Created: {new Date(qrCode.createdAt).toLocaleString()}
            </Typography>
          </Box>
        )}

        <Stack spacing={2} sx={{ mt: 3 }}>
          <Button 
            variant="contained" 
            color="primary"
            fullWidth
            size="large"
            startIcon={<QrCodeIcon />}
            onClick={() => navigate('/addqrcode')}
            sx={{
              borderRadius: 2,
              py: 1.5,
              textTransform: 'none',
              fontSize: '1.1rem'
            }}
          >
            Generate New QR Code
          </Button>
          
          {qrCode && (
            <Button 
              variant="contained"
              fullWidth
              size="large"
              startIcon={<WhatsAppIcon />}
              onClick={handleWhatsAppShare}
              sx={{
                borderRadius: 2,
                py: 1.5,
                textTransform: 'none',
                fontSize: '1.1rem',
                bgcolor: '#25D366',
                '&:hover': {
                  bgcolor: '#128C7E'
                }
              }}
            >
              Share via WhatsApp
            </Button>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};

export default Scanner;