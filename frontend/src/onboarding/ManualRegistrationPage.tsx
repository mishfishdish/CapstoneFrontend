// @ts-ignore
import React, {useEffect, useState} from 'react';
import {Alert, Box, Button, Paper, Snackbar, TextField, Typography} from '@mui/material';
import {useNavigate, useSearchParams} from "react-router-dom";
import {PAGE_REGISTRATION_SUCCESS} from "../PathConstants.tsx";
import config from "../../config.ts";
import {userIdSignal} from "../store/sessionSignal.ts";
import {jwtDecode} from 'jwt-decode';

export default function ManualRegistrationPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        role: '',
        clubName: '',
    });
    const [showError, setShowError] = useState(false);
    const [clubId, setClubId] = useState('');
    const [tokenPresent, setTokenPresent] = useState(false);
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        if (token) {
            try {
                const decoded: {
                    clubId: string;
                    clubName: string;
                    role: string;
                    email: string;
                } = jwtDecode(token);

                setTokenPresent(true);
                setClubId(decoded.clubId);
                setFormData((prev) => ({
                    ...prev,
                    email: decoded.email,
                    role: decoded.role,
                    clubName: decoded.clubName,
                }));
            } catch (err) {
                setShowError(true);
                alert('Could not decode token');
            }
        }
    }, [token]);

    const handleChange = (e: any) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleRegister = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch(config.apiBaseUrl + '/auth', {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                userIdSignal.value = data.userId;

                if (tokenPresent) {
                    const clubResponse = await fetch(config.apiBaseUrl + '/clubs/user', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            clubId,
                            email: formData.email,
                            role: formData.role,
                        }),
                    });

                    if (clubResponse.ok) {
                        navigate(PAGE_REGISTRATION_SUCCESS);
                    } else {
                        setShowError(true);
                        alert('Registration failed.');
                    }
                } else {
                    navigate(PAGE_REGISTRATION_SUCCESS);
                }
            } else if (response.status === 409) {
                setShowError(true);
                alert('User already exists. Please log in instead.');
            } else {
                setShowError(true);
                alert('Registration failed.');
            }
        } catch (error) {
            setShowError(true);
            alert('Registration failed.');
        }
    };


    return (
        <Box
            sx={{
                position: 'fixed',       // ensures full-viewport coverage
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#3c4a5d', // consistent dark background
                backgroundImage: `url('/background.svg')`, // optional texture/graphic
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right center',
                backgroundSize: 'contain',
                px: 2,
                overflow: 'hidden',
                zIndex: 0,
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
                    {tokenPresent && (
                        <>
                            <TextField
                                fullWidth
                                label="Role"
                                variant="outlined"
                                margin="normal"
                                name="role"
                                value={formData.role}
                                InputProps={{readOnly: true}}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                label="Club Name"
                                variant="outlined"
                                margin="normal"
                                name="clubName"
                                value={formData.clubName}
                                InputProps={{readOnly: true}}
                                onChange={handleChange}
                            />
                        </>
                    )}

                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        name="email"
                        value={formData.email}
                        InputProps={{readOnly: tokenPresent}}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        label="Firstname"
                        variant="outlined"
                        margin="normal"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        label="Lastname"
                        variant="outlined"
                        margin="normal"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        type="password"
                        margin="normal"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleRegister}
                        sx={{
                            mt: 2,
                            textTransform: 'none',
                            bgcolor: 'grey.900',
                            '&:hover': {bgcolor: 'grey.800'},
                        }}
                    >
                        Register
                    </Button>
                </form>
            </Paper>

            <Snackbar
                open={showError}
                autoHideDuration={5000}
                onClose={() => setShowError(false)}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
                <Alert onClose={() => setShowError(false)} severity="error" sx={{width: '100%'}}>
                    Registration failed.
                </Alert>
            </Snackbar>
        </Box>
    );
}
