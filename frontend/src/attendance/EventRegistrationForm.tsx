import React, {useState} from 'react';
import {
    Alert,
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    TextField,
    Typography,
} from '@mui/material';
import {useNavigate, useSearchParams} from "react-router-dom";
import config from "../../config.ts";
import {ATTENDANCE_SUCCESS} from "../PathConstants.tsx";

const EventRegistrationForm: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [memberType, setMemberType] = useState('');
    const [notes, setNotes] = useState('');
    const [searchParams] = useSearchParams();
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch(config.apiBaseUrl + "/attendance/" + searchParams.get('eventId'),
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstName,
                        lastName,
                        email,
                        memberType,
                        notes
                    }),
                });

            if (response.ok) {
                navigate(ATTENDANCE_SUCCESS)
            } else {
                setShowError(true);
            }
        } catch (error) {
            setShowError(true);
            alert('Activity Creation Failed.');
        }
    };

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
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    px: 2,
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: 600,
                        p: 4,
                        borderRadius: 4,
                        bgcolor: 'rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(16px)',
                        color: 'white',
                        boxShadow: '0px 4px 20px rgba(0,0,0,0.3)',
                    }}
                >
                    <Typography variant="h5" gutterBottom fontWeight={600}>
                        Event Registration
                    </Typography>

                    <TextField
                        fullWidth
                        label="Event Name"
                        value={searchParams.get('eventName')}
                        variant="filled"
                        InputProps={{readOnly: true}}
                        sx={{my: 2, bgcolor: 'white', borderRadius: 1}}
                    />


                    <TextField
                        fullWidth
                        label="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        variant="filled"
                        sx={{my: 2, bgcolor: 'white', borderRadius: 1}}
                    />


                    <TextField
                        fullWidth
                        label="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        variant="filled"
                        sx={{my: 2, bgcolor: 'white', borderRadius: 1}}
                    />

                    <TextField
                        fullWidth
                        label="E-mail Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="filled"
                        sx={{my: 2, bgcolor: 'white', borderRadius: 1}}
                    />

                    <FormControl fullWidth variant="filled" sx={{my: 2, bgcolor: 'white', borderRadius: 1}}>
                        <InputLabel>Member type</InputLabel>
                        <Select value={memberType} onChange={(e) => setMemberType(e.target.value)}>
                            <MenuItem value="Attendee">Attendee</MenuItem>
                            <MenuItem value="Manager">Manager</MenuItem>
                            <MenuItem value="Guest">Guest</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        variant="filled"
                        multiline
                        minRows={3}
                        sx={{my: 2, bgcolor: 'white', borderRadius: 1}}
                    />

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleSubmit}
                        sx={{
                            mt: 3,
                            bgcolor: 'black',
                            color: 'white',
                            '&:hover': {
                                bgcolor: '#333',
                            },
                        }}
                    >
                        Register
                    </Button>
                </Box>
            </Box>
            <Snackbar
                open={showError}
                autoHideDuration={5000}
                onClose={() => setShowError(false)}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
                <Alert onClose={() => setShowError(false)} severity="error" sx={{width: '100%'}}>
                    Event Registration failed.
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default EventRegistrationForm;