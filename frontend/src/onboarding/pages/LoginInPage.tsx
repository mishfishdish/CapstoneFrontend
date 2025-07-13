import React from 'react';
import {Box, Button, Container, Stack, TextField, Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import {PAGE_CLUB_SETTINGS, PAGE_REGISTRATION} from "../../PathConstants.tsx";

export default function LoginPage() {
    useTheme();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#3c4a5d',
                backgroundImage: `url('/background.svg')`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right center',
                backgroundSize: 'contain',
                px: 2,
            }}
        >
            <Container
                maxWidth="sm"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: '#fff',
                    borderRadius: 3,
                    p: 4,
                    boxShadow: 3,
                }}
            >
                <Box
                    sx={{
                        width: 100,
                        height: 100,
                        backgroundColor: '#00e0ff',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 48,
                        fontWeight: 'bold',
                        color: '#1a1a1a',
                        mb: 2,
                    }}
                >
                    Σ
                </Box>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    SigmaSchedule
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                    Simplifying Club Event Management
                </Typography>

                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <Stack direction="row" spacing={2} sx={{mt: 2, width: '100%'}}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={() => navigate(PAGE_REGISTRATION)}
                        sx={{
                            textTransform: 'none',
                            bgcolor: 'grey.900',
                            '&:hover': {
                                bgcolor: 'grey.800',
                            },
                        }}
                    >
                        New user
                    </Button>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={() => navigate(PAGE_CLUB_SETTINGS)}
                        sx={{
                            textTransform: 'none',
                            bgcolor: 'grey.900',
                            '&:hover': {
                                bgcolor: 'grey.800',
                            },
                        }}
                    >
                        Log in
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
}