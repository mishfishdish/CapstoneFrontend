import {Box, Container, Typography} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function EventSuccessPage() {

    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100vw',
                background: 'linear-gradient(to right, #2c3e50, #4ca1af)',
            }}
        >
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 3,
                }}
            >
                <Container
                    maxWidth="sm"
                    sx={{
                        backdropFilter: 'blur(20px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.06)',
                        borderRadius: 4,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                        padding: 4,
                        textAlign: 'center',
                    }}
                >
                    <CheckCircleOutlineIcon sx={{fontSize: 80, color: 'lightgreen', mb: 2}}/>
                    <Typography variant="h4" fontWeight="bold" color="white" gutterBottom>
                        Event Registered Successfully!
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
}