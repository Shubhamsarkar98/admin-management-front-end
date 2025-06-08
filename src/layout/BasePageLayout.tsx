// BasePageLayout.tsx
import { Box } from '@mui/material';
import type { ReactNode } from 'react';


const BasePageLayout = ({ children }: { children: ReactNode }) => {
    return (
        <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#f5f5f5' }}>


            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>

                <Box
                    sx={{
                        flexGrow: 1,
                        padding: 3,
                        backgroundColor: '#fff',
                        borderRadius: 2,
                        boxShadow: 1,
                        margin: 2,
                        overflowY: 'auto',
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default BasePageLayout;
