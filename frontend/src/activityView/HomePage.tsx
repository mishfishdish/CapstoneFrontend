import {Box, Button, Paper, Typography,} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LayoutContainer from '../common/LayoutContainer';
import {useNavigate} from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendarStyles.css';
import {useEffect, useState} from "react";
import {userIdSignal} from "../store/sessionSignal.ts"; // Custom calendar styles
import {format, parseISO} from 'date-fns';
import {PAGE_ACTIVITY} from "../PathConstants.tsx";
import config from "../../config.ts";

export default function TaskHomePage() {
    const navigate = useNavigate();
    const [home, setHome] = useState<DashboardResponse | null>(null);

    type Activity = {
        title: string;
        type: 'event' | 'task';
        startTime?: string; // ISO date string
        time?: string;      // ISO date string (optional fallback)
    };

    type Stat = {
        past?: number;      // for events
        completed?: number; // for tasks
        total: number;
    };

    type DashboardResponse = {
        name: string,
        activities: Activity[];
        events: Stat;
        tasks: Stat;
        logs: string[];
    };

    useEffect(() => {
        async function fetchClubs() {
            try {
                const response = await fetch(config.apiBaseUrl + `/homeview/${userIdSignal.value}`);
                if (response.ok) {
                    const data: DashboardResponse = await response.json();
                    setHome(data);
                } else {
                    console.error('Failed to fetch clubs');
                }
            } catch (err) {
                console.error('Error:', err);
            }
        }

        fetchClubs();
    }, []);

    return (
        <LayoutContainer>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    ml: '240px',
                    px: 2,
                    py: 6,
                    color: 'white', // Ensure white text inside
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: '1200px',
                        bgcolor: 'rgba(255,255,255,0.05)',
                        backdropFilter: 'blur(12px)',
                        borderRadius: 4,
                        boxShadow: 4,
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                        color: 'white', // Ensure white text inside
                    }}
                >
                    {/* Header */}
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{textAlign: 'left', width: '100%'}}
                    >
                        Hi {home?.name} 👋
                    </Typography>

                    {/* Top Row */}
                    <Box sx={{display: 'flex', gap: 4, flexWrap: 'wrap'}}>
                        <Paper
                            elevation={3}
                            sx={{
                                flex: 1,
                                minWidth: 300,
                                p: 3,
                                borderRadius: 3,
                                bgcolor: 'rgba(255,255,255,0.07)',
                                color: 'white',
                            }}
                        >

                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Upcoming Activities
                            </Typography>
                            {home?.activities.map(activity => (
                                <Typography key={activity.title}>
                                    • {activity.title}
                                    <strong>
                                        {activity.time && ` ${format(parseISO(activity.time), 'dd MM yyyy HH:mm')}`}
                                    </strong>
                                </Typography>
                            ))}
                        </Paper>

                        <Paper
                            elevation={3}
                            sx={{
                                flex: 1,
                                minWidth: 300,
                                p: 3,
                                borderRadius: 3,
                                bgcolor: 'rgba(255,255,255,0.07)',
                                color: 'white',
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Activities Overview
                            </Typography>
                            <Typography sx={{mb: 2}}>{home?.events?.past} out of {home?.events?.total} events
                                completed</Typography>
                            <Typography sx={{mb: 2}}>{home?.tasks?.completed} out of {home?.tasks?.total} tasks
                                completed</Typography>

                            <Button
                                variant="contained"
                                startIcon={<AddIcon/>}
                                sx={{
                                    bgcolor: 'grey.900',
                                    '&:hover': {bgcolor: 'grey.800'},
                                    textTransform: 'none',
                                    color: 'white',
                                }}
                                onClick={() => navigate(PAGE_ACTIVITY)}
                            >
                                Create a new activity
                            </Button>
                        </Paper>
                    </Box>

                    {/* Bottom Row */}
                    <Box sx={{display: 'flex', gap: 4, flexWrap: 'wrap'}}>
                        <Paper
                            elevation={3}
                            sx={{
                                flex: 1,
                                minWidth: 300,
                                p: 3,
                                borderRadius: 3,
                                bgcolor: 'rgba(255,255,255,0.07)',
                                color: 'white',
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Calendar
                            </Typography>
                            <Box sx={{overflowX: 'auto'}}>
                                <Calendar
                                    value={new Date()}
                                    tileClassName={({date}) =>
                                        date.toDateString() === new Date().toDateString()
                                            ? 'highlight-today'
                                            : 'calendar-tile'
                                    }
                                />
                            </Box>
                        </Paper>

                        <Paper
                            elevation={3}
                            sx={{
                                flex: 1,
                                minWidth: 300,
                                p: 3,
                                borderRadius: 3,
                                bgcolor: 'rgba(255,255,255,0.07)',
                                color: 'white',
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Activity
                            </Typography>
                            {home?.logs.map(
                                log =>
                                    <Typography>{log}</Typography>
                            )}
                        </Paper>
                    </Box>
                </Box>
            </Box>
        </LayoutContainer>
    );
}