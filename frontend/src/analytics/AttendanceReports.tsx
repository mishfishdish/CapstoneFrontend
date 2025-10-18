import { useEffect, useState } from 'react';
import {
    Alert,
    Box,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    Typography
} from '@mui/material';
import LayoutContainer from '../common/LayoutContainer';
import config from '../../config';
import { clubIdSignal } from "../store/sessionSignal.ts";

export default function AttendanceReportPage() {
    const [selectedEvent, setSelectedEvent] = useState('');
    const [eventOptions, setEventOptions] = useState<{ activityId: string; activityTitle: string }[]>([]);
    const [attendees, setAttendees] = useState<{ firstName: string; lastName: string; memberType: string }[]>([]);
    const [showError, setShowError] = useState(false);


    // Fetch user's clubs
    useEffect(() => {
        async function fetchEvents() {
            try {
                const response = await fetch(`${config.apiBaseUrl}/clubs/${clubIdSignal.value}/events`);
                if (response.ok) {
                    const data = await response.json();
                    setEventOptions(data);

                    if (data.length > 0) {
                        const defaultEventId = data[0].activityId;
                        setSelectedEvent(defaultEventId);
                    }
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
    }, []);

    // Fetch attendees for a given event
    useEffect(() => {
        if (!selectedEvent) return;

        async function fetchAttendance() {
            try {
                const response = await fetch(`${config.apiBaseUrl}/attendance/${selectedEvent}`);
                if (response.ok) {
                    const data = await response.json();
                    setAttendees(data.attendees || []);
                } else {
                    console.error('Failed to fetch attendance');
                    setShowError(true);
                }
            } catch (err) {
                console.error('Error fetching attendance:', err);
                setShowError(true);
            }
        }

        fetchAttendance();
    }, [selectedEvent]);

    return (
        <LayoutContainer>
            <Box
                sx={{
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    ml: { xs: 0, md: '240px' },
                    px: { xs: 2, md: 4 },
                    py: { xs: 4, md: 6 },
                    flexGrow: 1,
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        flexGrow: 1,
                        bgcolor: 'rgba(255,255,255,0.06)',
                        borderRadius: 4,
                        p: { xs: 2, md: 4 },
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 0 20px rgba(0,0,0,0.2)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                    }}
                >
                    <Typography variant="h5" fontWeight="bold" mb={2}>
                        Attendance Report
                    </Typography>

                    {/* Event dropdown */}
                    {eventOptions.length > 0 && (
                        <FormControl variant="outlined">
                            <InputLabel id="club-label" sx={{ color: 'white' }}>Events</InputLabel>
                            <Select
                                labelId="club-label"
                                value={selectedEvent}
                                onChange={(e) => {
                                    setSelectedEvent(e.target.value);
                                }}
                                label="Events"
                                sx={{
                                    minWidth: 150,
                                    bgcolor: 'rgba(255,255,255,0.08)',
                                    color: 'white',
                                    borderRadius: 2,
                                    '.MuiSvgIcon-root': { color: 'white' },
                                }}
                            >
                                {eventOptions.map((c) => (
                                    <MenuItem key={c.activityId} value={c.activityId}>
                                        {c.activityTitle}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}

                    {/* Attendee cards */}
                    <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                    >
                    {attendees.length === 0 ? (
                        <Typography>No attendees found.</Typography>
                    ) : (
                        attendees.map((attendee, index) => (
                        <Box
                            key={index}
                            sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: 2,
                            width: '100%',
                            }}
                        >
                            <Card
                            sx={{
                                flex: 1,
                                bgcolor: 'rgba(255,255,255,0.1)',
                                color: 'white',
                                borderRadius: 2,
                            }}
                            >
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold">
                                {attendee.firstName} {attendee.lastName}
                                </Typography>
                            </CardContent>
                            
                            <CardContent>
                                <Typography variant="body1" fontWeight="bold">
                                {attendee.memberType}
                                </Typography>
                            </CardContent>
                            </Card>
                        </Box>
                        ))
                    )
                    

                </Box>
            </Box>

            <Snackbar
                open={showError}
                autoHideDuration={5000}
                onClose={() => setShowError(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setShowError(false)} severity="error" sx={{ width: '100%' }}>
                    Failed to load attendance report.
                </Alert>
            </Snackbar>
        </LayoutContainer>
    );
}
