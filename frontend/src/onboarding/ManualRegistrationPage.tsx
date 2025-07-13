// @ts-ignore
import React from 'react';
import {Box, Button, Paper, TextField, Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {PAGE_REGISTRATION_SUCCESS} from "../PathConstants.tsx";

export default function ManualRegistrationPage() {
    const navigate = useNavigate(); // ✅ initialize

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: '#3c4a5d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
                backgroundImage: `url('/background.svg')`, // optional: your illustration here
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right center',
                backgroundSize: 'contain',
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    p: 4,
                    borderRadius: 3,
                    bgcolor: '#fff',
                }}
            >
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Sign up
                </Typography>
                <Typography variant="body2" sx={{mb: 3}}>
                    Welcome to SigmaSchedule. Let's make an account.
                </Typography>

                <form>
                    <TextField fullWidth label="Email" variant="outlined" margin="normal"/>
                    <TextField fullWidth label="Firstname" variant="outlined" margin="normal"/>
                    <TextField fullWidth label="Lastname" variant="outlined" margin="normal"/>
                    <TextField fullWidth label="Username" variant="outlined" margin="normal"/>
                    <TextField fullWidth label="Password" variant="outlined" type="password" margin="normal"/>

                    <Button
                        fullWidth
                        variant="contained"
                        onClick={() => navigate(PAGE_REGISTRATION_SUCCESS)} //
                        sx={{
                            mt: 2,
                            textTransform: 'none',
                            bgcolor: 'grey.900',
                            '&:hover': {
                                bgcolor: 'grey.800',
                            },
                        }}
                    >
                        Register
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}