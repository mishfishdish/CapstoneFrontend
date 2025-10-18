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
import {PAGE_CLUB_SETTINGS, PAGE_CREATE_SUCCESS} from "../PathConstants.tsx";

export interface ActivityResponse {
    activityId: string;
    activityTitle: string;
    startTime: string | null;
    endTime: string | null;
    dependsOnEventId: string | null;
}

export default function CreateTaskPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [clubs, setClubs] = useState<string[]>([]);
    const [clubOptions, setClubOptions] = useState<{ clubId: string; clubName: string }[]>([]);
    const [eventOptions, setEventOptions] = useState<ActivityResponse[]>([]);
    const [dueDate, setDueDate] = useState<Date | null>(new Date());
    const [parentEvent, setParentEvent] = useState('');
    const [notify, setNotify] = useState(false);
    const [notifyMinutes, setNotifyMinutes] = useState<string>('10');
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    // ✅ Fetch clubs user belongs to
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

    // ✅ Fetch events when clubIdSignal.value changes
    useEffect(() => {
        if (!clubIdSignal.value) return;

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

        fetchEvents();
    }, [clubIdSignal.value]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch(config.apiBaseUrl + '/tasks', {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    title,
                    description,
                    priority,
                    clubs,
                    dueDate,
                    parentEvent,
                    ...(notifyMinutes && {
                        notification: {
                            userId: userIdSignal.value,
                            notifyBeforeMinutes: notifyMinutes,
                        },
                    }),
                    userId: userIdSignal.value,
                }),
            });

            if (response.ok) {
                navigate(PAGE_CREATE_SUCCESS);
            } else {
                setShowError(true);
            }
        } catch (error) {
            setShowError(true);
            alert('Task creation failed.');
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
                {clubOptions.length === 0 ? (
                    // ✅ Case 1: user not part of any clubs
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
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h5" fontWeight={600} gutterBottom>
                            You are not part of any clubs.
                        </Typography>
                        <Typography variant="body1" sx={{mb: 2}}>
                            Join a club first before creating a task.
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: 'black',
                                color: 'white',
                                '&:hover': {bgcolor: '#333'},
                            }}
                            onClick={() => navigate(PAGE_CLUB_SETTINGS)}
                        >
                            Go to Clubs Page
                        </Button>
                    </Box>
                ) : (
                    // ✅ Case 2: show task creation form
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
                            Create a new task
                        </Typography>

                        <TextField
                            fullWidth
                            label="Task Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            variant="filled"
                            sx={{my: 2, bgcolor: 'white', borderRadius: 1}}
                        />

                        <Typography fontSize={14} fontWeight={500}>
                            Date to complete
                        </Typography>
                        <DateTimePicker
                            value={dueDate}
                            onChange={setDueDate}
                            sx={{my: 2, width: '100%', bgcolor: 'white', borderRadius: 1}}
                        />

                        <FormControl fullWidth variant="filled" sx={{my: 2, bgcolor: 'white', borderRadius: 1}}>
                            <InputLabel>Clubs involved</InputLabel>
                            <Select
                                multiple
                                value={clubs}
                                onChange={(e) => setClubs(e.target.value as string[])}
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
                            <InputLabel>Task Priority</InputLabel>
                            <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                <MenuItem value="low">Low</MenuItem>
                                <MenuItem value="medium">Medium</MenuItem>
                                <MenuItem value="high">High</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            label="Task Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            multiline
                            minRows={3}
                            variant="filled"
                            sx={{my: 2, bgcolor: 'white', borderRadius: 1}}
                        />

                        <FormControl fullWidth variant="filled" sx={{my: 2, bgcolor: 'white', borderRadius: 1}}>
                            <InputLabel>Parent Event</InputLabel>
                            <Select value={parentEvent} onChange={(e) => setParentEvent(e.target.value)}>
                                {eventOptions.map((activity: ActivityResponse) => (
                                    <MenuItem key={activity.activityId} value={activity.activityId}>
                                        {activity.activityTitle}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={notify}
                                    onChange={(e) => setNotify(e.target.checked)}
                                    sx={{color: 'white'}}
                                />
                            }
                            label="Notify Task Via Email"
                        />

                        {notify && (
                            <FormControl fullWidth variant="filled" sx={{my: 2, bgcolor: 'white', borderRadius: 1}}>
                                <InputLabel>Notify Time</InputLabel>
                                <Select value={notifyMinutes} onChange={(e) => setNotifyMinutes(e.target.value)}>
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
                                '&:hover': {bgcolor: '#333'},
                            }}
                        >
                            Create task
                        </Button>
                    </Box>
                )}
            </Box>

            <Snackbar
                open={showError}
                autoHideDuration={5000}
                onClose={() => setShowError(false)}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
                <Alert onClose={() => setShowError(false)} severity="error" sx={{width: '100%'}}>
                    Task creation failed.
                </Alert>
            </Snackbar>
        </LayoutContainer>
    );
}
