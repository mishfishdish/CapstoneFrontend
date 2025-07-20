import {
    Alert,
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    IconButton,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    Snackbar,
    TextField,
    Typography
} from '@mui/material';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {useEffect, useState} from 'react';
import LayoutContainer from '../common/LayoutContainer.tsx';
import config from '../../config.ts';
import {clubIdSignal, userIdSignal} from '../store/sessionSignal.ts';
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate, useSearchParams} from "react-router-dom";
import {PAGE_DELETE_SUCCESS, PAGE_UPDATE_SUCCESS} from "../PathConstants.tsx";


export interface ActivityResponse {
    activityId: string;
    activityTitle: string;
    startTime: string | null;
    endTime: string | null;
    dependsOnEventId: string | null;

}

export default function UpdateEventPage() {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [clubs, setClubs] = useState<string[]>([]);
    const [clubOptions, setClubOptions] = useState<{ clubId: string; clubName: string }[]>([]);
    const [eventOptions, setEventOptions] = useState<ActivityResponse[]>([]);
    const [parentEvent, setParentEvent] = useState('');
    const [description, setDescription] = useState('');
    const [notify, setNotify] = useState(false);
    const [notifyMinutes, setNotifyMinutes] = useState('10');
    const [showError, setShowError] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchEvent() {
            try {
                const response = await fetch(`${config.apiBaseUrl}/events/${searchParams.get('eventId')}`);
                if (response.ok) {
                    const data = await response.json();
                    setStartDate(new Date(data.startTime))
                    setEndDate(new Date(data.endTime))
                    setTitle(data.title)
                    setLocation(data.location)
                    setClubs(data.clubs)
                    setParentEvent(data.parentEventId)
                    setDescription(data.description)
                    setNotify(data.notifyBeforeMinutes != null)
                    if (data.notifyBeforeMinutes) {
                        setNotifyMinutes(data.notifyBeforeMinutes);
                    }
                    setQrCodeDataUrl(data.qrCode)
                } else {
                    setShowError(true);
                    alert('Failed to fetch event data');
                }
            } catch (err) {
                setShowError(true);
                alert('Failed to fetch event data');
            }
        }

        fetchEvent();
    }, []);

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

        fetchEvents();
    }, [clubIdSignal]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch(config.apiBaseUrl + '/events/' + searchParams.get('eventId'), {
                method: 'PUT',
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
                    parentEvent,
                    description,
                    ...(notifyMinutes != null && {
                        notification: {
                            userId: userIdSignal.value,
                            notifyBeforeMinutes: notifyMinutes,
                        },
                    }),
                    userId: userIdSignal.value,
                }),
            });

            if (response.ok) {
                navigate(PAGE_UPDATE_SUCCESS)
            } else {
                setShowError(true);
            }
        } catch (error) {
            setShowError(true);
            alert('Activity Creation Failed.');
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(config.apiBaseUrl + '/events/' + searchParams.get('eventId'), {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                navigate(PAGE_DELETE_SUCCESS)
            } else {
                setShowError(true);
            }
        } catch (error) {
            setShowError(true);
            alert('Activity Deletion Failed.');
        }
    };

    const handleShowQrCode = async () => {
        // Simulate fetching QR code from backend
        const fakeQrBase64 =
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAYSURBVHja7cExAQAAAMKg9U9tCF8gAAAAAAAAAAAAgLUaAAEwvK6KAAAAAElFTkSuQmCC';

        // Simulated response delay
        setTimeout(() => {
            setQrCodeDataUrl(fakeQrBase64);
            setShowQR(true);
        }, 500);
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
                        Update event
                    </Typography>

                    <TextField
                        fullWidth
                        label="Event Title"
                        value={"hello"}
                        variant="filled"
                        InputProps={{readOnly: true}}
                        sx={{my: 2, bgcolor: 'white', borderRadius: 1}}
                    />

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
                        <InputLabel>Parent Event</InputLabel>
                        <Select value={parentEvent} onChange={(e) => setParentEvent(e.target.value)}>
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
                            '&:hover': {
                                bgcolor: '#333',
                            },
                        }}
                    >
                        Update event
                    </Button>

                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={handleShowQrCode}
                        sx={{mt: 2, color: 'white', borderColor: 'white', '&:hover': {borderColor: 'gray'}}}
                    >
                        Show QR Code
                    </Button>

                    <Dialog open={showQR} onClose={() => setShowQR(false)}>
                        <DialogTitle sx={{m: 0, p: 2}}>
                            Event QR Code
                            <IconButton
                                aria-label="close"
                                onClick={() => setShowQR(false)}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <CloseIcon/>
                            </IconButton>
                        </DialogTitle>
                        <DialogContent dividers sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <img src={qrCodeDataUrl} alt="QR Code" style={{width: 200, height: 200}}/>
                        </DialogContent>
                    </Dialog>

                    <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        onClick={handleDelete}
                        sx={{mt: 3}}
                    >
                        Delete Event
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