import {Box, Button, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {PAGE_HOME} from "../PathConstants.tsx";

export default function RegistrationSuccessPage() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                position: 'fixed',          // ensures it covers the whole viewport
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: '#3c4a5d', // consistent with your theme
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
                textAlign: 'center',
                overflow: 'hidden',
                zIndex: 0,                  // keeps it behind modal elements if any
            }}
        >
            <Box sx={{mt: 0}}>
                <img
                    src="/teamSuccess.png"
                    alt="Success Illustration"
                    style={{
                        width: '280px',
                        marginBottom: '2rem',
                        maxWidth: '90vw',
                    }}
                />
                <Typography variant="h6" sx={{color: 'white', mb: 4}}>
                    You’re officially registered with <br/>
                    <strong>SigmaSchedule</strong>
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => navigate(PAGE_HOME)}
                    sx={{
                        textTransform: 'none',
                        bgcolor: 'grey.900',
                        px: 4,
                        py: 1.5,
                        '&:hover': {
                            bgcolor: 'grey.800',
                        },
                    }}
                >
                    Go to dashboard
                </Button>
            </Box>
        </Box>
    );
}
