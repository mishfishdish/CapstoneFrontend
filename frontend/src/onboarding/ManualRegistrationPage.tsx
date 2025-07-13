// @ts-ignore
import React, {useState} from 'react';
import {Alert, Box, Button, Paper, Snackbar, TextField, Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {PAGE_REGISTRATION_SUCCESS} from "../PathConstants.tsx";
import config from "../../config.ts";
import {userIdSignal} from ".././store/sessionSignal.ts";


export default function ManualRegistrationPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        firstname: '',
        lastname: '',
        username: '',
        password: '',
    });
    const [showError, setShowError] = useState(false);


    const handleChange = (e: any) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleRegister = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch(config.apiBaseUrl + '/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json(); // ⬅️ Parse JSON response
                userIdSignal.value = data.userId
                navigate(PAGE_REGISTRATION_SUCCESS);
            } else {
                setShowError(true);
            }
        } catch (error) {
            setShowError(true);
            alert('Registration failed.');
        }
    };


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
                    <TextField fullWidth label="Email" variant="outlined" margin="normal" name="email"
                               value={formData.email}
                               onChange={handleChange}/>
                    <TextField fullWidth label="Firstname" variant="outlined" margin="normal" name="firstname"
                               value={formData.firstname}
                               onChange={handleChange}/>
                    <TextField fullWidth label="Lastname" variant="outlined" margin="normal" name="lastname"
                               value={formData.lastname}
                               onChange={handleChange}/>
                    <TextField fullWidth label="Username" variant="outlined" margin="normal" name="username"
                               value={formData.username}
                               onChange={handleChange}/>
                    <TextField fullWidth label="Password" variant="outlined" type="password" margin="normal"
                               name="password"
                               value={formData.password}
                               onChange={handleChange}/>

                    <Button
                        fullWidth
                        variant="contained"
                        onClick={e => handleRegister(e)} //
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