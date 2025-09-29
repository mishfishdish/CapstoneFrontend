import {
    Alert,
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    Snackbar,
    TextField,
    Typography,
} from '@mui/material';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {useEffect, useState} from 'react';
import LayoutContainer from '../common/LayoutContainer.tsx';
import config from "../../config.ts";
import {clubIdSignal, userIdSignal} from "../store/sessionSignal.ts";
import {useNavigate} from "react-router-dom";
import {PAGE_CREATE_SUCCESS} from "../PathConstants.tsx";

export interface ActivityResponse {
    activityId: string; // UUID as string
    activityTitle: string;
    startTime: string | null; // ISO date string or null
    endTime: string | null;
    dependsOnEventId: string | null; // nullable UUID
}

export default function CreateEventPage() {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [clubs, setClubs] = useState<string[]>([]);
    const [clubOptions, setClubOptions] = useState<{ clubId: string, clubName: string }[]>([]);
    const [eventOptions, setEventOptions] = useState<ActivityResponse[]>([]);
    const [parentEvent, setParentEvent] = useState('');
    const [description, setDescription] = useState('');
    const [notify, setNotify] = useState(false);
    const [notifyMinutes, setNotifyMinutes] = useState('10');
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        async function fetchClubs() {
            try {
                const response = await fetch(`${config.apiBaseUrl}/users/${userIdSignal.value}/clubs`);
                if (response.ok) {
                    const data = await response.json();
                    setClubOptions(data);
                } else {
                    setShowError(true);
                    alert('Failed to fetch clubs');
                }
            } catch (err) {
                setShowError(true);
                alert('Failed to fetch clubs');
            }
        }

        fetchClubs();
    }, []);

    useEffect(() => {

        async function fetchEvents() {
            try {
                const response = await fetch(`${config.apiBaseUrl}/clubs/${clubIdSignal.value}/events`);
                if (response.ok) {
                    const data = await response.json();
                    setEventOptions(data);
                } else {
                    setShowError(true);
                    alert('Failed to fetch events');
                }
            } catch (err) {
                setShowError(true);
                alert('Failed to fetch events');
            }
        }

        fetchEvents()
    }, [clubIdSignal]);


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch(config.apiBaseUrl + '/events', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    startTime: startDate,
                    endTime: endDate,
                    title,
                    location,
                    clubs,
                    parentEventId: parentEvent,
                    description,
                    ...(notifyMinutes != null && {
                        notification: {
                            userId: userIdSignal.value,
                            notifyBeforeMinutes: notifyMinutes,
                        }
                    }),
                    userId: userIdSignal.value
                }),
            });

            if (response.ok) {
                navigate(PAGE_CREATE_SUCCESS)


            } else {
                setShowError(true);
            }
        } catch (error) {
            setShowError(true);
            alert('Activity Creation Failed.');
        }
    };

    return (
        <LayoutContainer>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    ml: '240px',
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
                        Create a new event
                    </Typography>

                    <Typography fontSize={14} fontWeight={500}>
                        Start Date
                    </Typography>
                    <DateTimePicker
                        value={startDate}
                        onChange={setStartDate}
                        sx={{my: 2, width: '100%', bgcolor: 'white', borderRadius: 1}}
                    />

                    <Typography fontSize={14} fontWeight={500}>
                        End Date
                    </Typography>
                    <DateTimePicker
                        value={endDate}
                        onChange={setEndDate}
                        sx={{my: 2, width: '100%', bgcolor: 'white', borderRadius: 1}}
                    />

                    <TextField
                        fullWidth
                        label="Event Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        variant="filled"
                        sx={{my: 2, bgcolor: 'white', borderRadius: 1}}
                    />

                    <TextField
                        fullWidth
                        label="Event Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        variant="filled"
                        sx={{my: 2, bgcolor: 'white', borderRadius: 1}}
                    />

                    <FormControl fullWidth variant="filled" sx={{my: 2, bgcolor: 'white', borderRadius: 1}}>
                        <InputLabel>Clubs involved</InputLabel>
                        <Select
                            labelId="club-select-label"
                            multiple
                            value={clubs}
                            onChange={(e) => {
                                setClubs(e.target.value as string[]);

                            }}
                            renderValue={(selected) =>
                                selected
                                    .map((clubId) => clubOptions.find((c) => c.clubId === clubId)?.clubName || clubId)
                                    .join(', ')
                            }
                        >
                            {clubOptions.map((club) => (
                                <MenuItem key={club.clubId} value={club.clubId}>
                                    <Checkbox checked={clubs.includes(club.clubId)}/>
                                    <ListItemText primary={club.clubName}/>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth variant="filled" sx={{my: 2, bgcolor: 'white', borderRadius: 1}}>
                        <InputLabel>Parent Event</InputLabel>
                        <Select
                            value={parentEvent}
                            onChange={(e) => setParentEvent(e.target.value)}
                        >
                            {eventOptions.map((activity: ActivityResponse) => (
                                <MenuItem key={activity.activityId} value={activity.activityId}>
                                    {activity.activityTitle}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Event Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        multiline
                        minRows={3}
                        variant="filled"
                        sx={{my: 2, bgcolor: 'white', borderRadius: 1}}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={notify}
                                onChange={(e) => setNotify(e.target.checked)}
                                sx={{color: 'white'}}
                            />
                        }
                        label="Notify Event Via Email"
                    />

                    {notify && (
                        <FormControl fullWidth variant="filled" sx={{my: 2, bgcolor: 'white', borderRadius: 1}}>
                            <InputLabel>Notify Time</InputLabel>
                            <Select
                                value={notifyMinutes}
                                onChange={(e) => setNotifyMinutes(e.target.value)}
                            >
                                <MenuItem value="5">5 minutes before</MenuItem>
                                <MenuItem value="10">10 minutes before</MenuItem>
                                <MenuItem value="30">30 minutes before</MenuItem>
                            </Select>
                        </FormControl>
                    )}

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
                        Create event
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
                    Activity creation failed.
                </Alert>
            </Snackbar>
        </LayoutContainer>
    );
}