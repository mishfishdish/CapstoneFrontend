// components/LayoutContainer.jsx
import {Box} from '@mui/material';
import Sidebar from './Sidebar';

export default function LayoutContainer({children}: any) {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100vw',
                background: 'linear-gradient(to right, #2c3e50, #4ca1af)',
                display: 'flex',
            }}
        >
            <Sidebar/>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 4,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {children}
            </Box>
        </Box>
    );
}