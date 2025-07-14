// @ts-ignore
import React, {useState} from 'react';
import {Alert, Box, Button, Container, Snackbar, Stack, TextField, Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import {PAGE_CLUB_SETTINGS, PAGE_REGISTRATION} from "../PathConstants.tsx";
import config from "../../config.ts";
import {userIdSignal} from ".././store/sessionSignal.ts";

export default function LoginPage() {
    useTheme();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await fetch(config.apiBaseUrl + '/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });

            if (response.ok) {
                const data = await response.json(); // ⬅️ Parse JSON response
                userIdSignal.value = data.userId
                navigate(PAGE_CLUB_SETTINGS);
            } else {
                setError(true);
            }
        } catch (err) {
            console.error(err);
            setError(true);
        }
    };

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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                        onClick={handleLogin}
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

            <Snackbar
                open={error}
                autoHideDuration={4000}
                onClose={() => setError(false)}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
                <Alert onClose={() => setError(false)} severity="error" sx={{width: '100%'}}>
                    Invalid username or password.
                </Alert>
            </Snackbar>
        </Box>
    );
}