import {Alert, Box, FormControl, InputLabel, MenuItem, Select, Snackbar, Typography,} from '@mui/material';
import {Calendar, dateFnsLocalizer,} from 'react-big-calendar';
import {format, getDay, parse, startOfWeek} from 'date-fns';
import {useEffect, useState} from 'react';
import LayoutContainer from '../common/LayoutContainer.tsx';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {enAU} from "date-fns/locale";
import {useNavigate} from "react-router-dom";
import config from "../../config.ts";
import {clubIdSignal, userIdSignal} from "../store/sessionSignal.ts";
import {PAGE_UPDATE_EVENT, PAGE_UPDATE_TASK} from "../PathConstants.tsx";

const locales = {
    'en-AU': enAU,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});


export interface ActivityResponse {
    activityId: string; // UUID as string
    activityTitle: string;
    startTime: string | null; // ISO date string or null
    endTime: string | null;
    dependsOnEventId: string | null; // nullable UUID
    type: "event" | "task"
}

export default function CalendarViewPage() {
    const [selectedClub, setSelectedClub] = useState<string>("");
    const [showError, setShowError] = useState(false);
    const [clubOptions, setClubOptions] = useState<{ clubId: string; clubName: string }[]>([]);
    const [event, setEvent] = useState<ActivityResponse[]>([]);

    const navigate = useNavigate();
    const handleEventClick = (event: any) => {
        // Assuming event has an ID or type field to determine where to go
        if (event.type === 'event') {
            navigate(`${PAGE_UPDATE_EVENT}/?eventId=${event.activityId}`);
        } else if (event.type === 'task') {
            navigate(`${PAGE_UPDATE_TASK}?taskId=${event.activityId}`);
        }
    };

    useEffect(() => {
        async function fetchClubs() {
            try {
                const response = await fetch(`${config.apiBaseUrl}/users/${userIdSignal.value}/clubs`);
                if (response.ok) {
                    const data = await response.json();
                    setClubOptions(data);
                    if (data.length > 0) {
                        clubIdSignal.value = data[0].clubId; // Set signal, triggers second useEffect
                    }
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
    }, []); // Only runs on mount

    useEffect(() => {
        if (!clubIdSignal.value) return; // Don't fetch if clubId is empty or undefined

        async function fetchActivities() {
            try {
                const response = await fetch(`${config.apiBaseUrl}/clubs/activity?clubId=${clubIdSignal.value}`);
                if (response.ok) {
                    const rawData = await response.json();
                    console.log("raw");
                    console.log(rawData);
                    // @ts-ignore
                    const parsed = rawData.map((activity: ActivityResponse): any => ({
                        ...activity,
                        startTime: activity.startTime
                            ? new Date(activity.startTime)
                            : activity.endTime
                                ? new Date(activity.endTime) // fallback for tasks
                                : new Date(),
                        endTime: activity.endTime ? new Date(activity.endTime) : undefined,
                        title: activity.activityTitle
                    }));
                    console.log(parsed)
                    setEvent(parsed);
                } else {
                    setShowError(true);
                    alert('Failed to fetch activities');
                }
            } catch (err) {
                setShowError(true);
                alert('Failed to fetch activities');
            }
        }

        fetchActivities();
    }, [clubIdSignal.value]);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const newClubId = event.target.value as string;
        setSelectedClub(newClubId);
        clubIdSignal.value = newClubId;
    };

    return (
        <LayoutContainer>
            <Box
                sx={{
                    minHeight: '100vh',
                    ml: {xs: 0, md: '240px'},
                    px: {xs: 2, md: 5},
                    py: {xs: 4, md: 6},
                    color: 'white',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: {xs: 'column', sm: 'row'},
                        justifyContent: 'space-between',
                        alignItems: {xs: 'flex-start', sm: 'center'},
                        gap: 1,
                        mb: 4,
                    }}
                >
                    <Typography variant="h5" fontWeight="bold">
                        Calendar view
                    </Typography>
                    <FormControl variant="outlined">
                        <InputLabel id="club-select-label">Select Club</InputLabel>
                        <Select
                            labelId="club-select-label"
                            value={selectedClub}
                            onChange={handleChange as any}
                            label="Select Club"
                            sx={{
                                minWidth: 250, // or whatever width you want
                                bgcolor: 'rgba(255,255,255,0.08)',
                                color: 'white',
                                borderRadius: 2,
                                '.MuiSvgIcon-root': {color: 'white'},
                            }}
                        >
                            {clubOptions.map((club) => (
                                <MenuItem key={club.clubId} value={club.clubId}>
                                    {club.clubName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Box
                        sx={{
                            bgcolor: 'rgba(255,255,255,0.06)',
                            borderRadius: 4,
                            p: 2,
                            backdropFilter: 'blur(12px)',
                            height: {xs: 'calc(100vh - 260px)', md: 'calc(100vh - 200px)'},
                            width: 800,
                            maxWidth: 1200,
                            '& .rbc-calendar': {
                                backgroundColor: 'transparent',
                                color: 'white',
                                height: '100%',
                            },
                            '& .rbc-event-content': {
                                fontSize: '0.75rem', // smaller text
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            },
                            '& .rbc-event': {
                                backgroundColor: '#00adb5',
                                border: 'none',
                                borderRadius: 6,
                                padding: '4px 8px',
                            },
                            '& .rbc-month-view': {
                                border: 'none',
                            },
                            '& .rbc-date-cell': {
                                color: 'white',
                            },
                            '& .rbc-day-bg': {
                                borderColor: 'rgba(255,255,255,0.1)',
                            },
                            '& .rbc-today': {
                                backgroundColor: 'rgba(255,255,255,0.05) !important',
                            },
                            '.rbc-toolbar': {
                                justifyContent: 'flex-start !important'
                            },
                            '.rbc-toolbar button': {
                                color: 'white !important',
                                borderColor: 'white !important'
                            }
                        }}
                    >
                        <Calendar
                            localizer={localizer}
                            events={event}
                            startAccessor="startTime"
                            endAccessor="endTime"
                            views={['month']}
                            popup
                            style={{height: '100%'}}
                            onSelectEvent={handleEventClick}
                        />
                    </Box>
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