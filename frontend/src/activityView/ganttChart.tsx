import {Alert, Box, FormControl, InputLabel, MenuItem, Select, Snackbar, Typography} from '@mui/material';
import {useEffect, useState} from 'react';
import {Gantt, ViewMode} from 'gantt-task-react';
import LayoutContainer from '../common/LayoutContainer.tsx';
import 'gantt-task-react/dist/index.css';
import {PAGE_UPDATE_EVENT, PAGE_UPDATE_TASK} from "../PathConstants.tsx";
import {useNavigate} from "react-router-dom";
import config from "../../config.ts";
import {clubIdSignal, userIdSignal} from "../store/sessionSignal.ts";


export interface ActivityResponse {
    activityId: string; // UUID as string
    activityTitle: string;
    startTime: string | null; // ISO date string or null
    endTime: string | null;
    dependsOnEventId: string | null; // nullable UUID
    type: "event" | "task"
}

export default function GanttChartPage() {
    const [view] = useState(ViewMode.Month);
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [event, setEvent] = useState<ActivityResponse[]>([]);
    const [clubOptions, setClubOptions] = useState<{ clubId: string; clubName: string }[]>([]);
    const [selectedClub, setSelectedClub] = useState<string>("");


    const handleEventClick = (event: any) => {
        // Assuming event has an ID or type field to determine where to go
        if (event.type === 'event') {
            navigate(`${PAGE_UPDATE_EVENT}/?eventId=${event.id}`);
        } else if (event.type === 'task') {
            navigate(`${PAGE_UPDATE_TASK}?taskId=${event.id}`);
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
                const response = await fetch(`${config.apiBaseUrl}/clubs/${clubIdSignal.value}/activity`);
                if (response.ok) {
                    const rawData = await response.json();
                    const parsed = rawData
                        .filter((activity: ActivityResponse) => activity.startTime && activity.endTime) // eliminate nulls early
                        .map((activity: ActivityResponse): any => ({
                            id: activity.activityId,
                            name: activity.activityTitle,
                            start: new Date(activity.startTime as string),
                            end: new Date(activity.endTime as string),
                            type: activity.type,
                            dependencies: activity.dependsOnEventId ? [activity.dependsOnEventId] : [],
                            progress: 0, // required by gantt-task-react
                        }));// Remove nulls
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
                    pl: {xs: 0, md: '240px'}, // Space for sidebar (adjust as per actual sidebar width)
                    pr: {xs: 2, md: 5},
                    py: {xs: 4, md: 6},
                    display: 'flex',
                    flexDirection: 'column',
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
                        mb: 7,
                    }}
                >
                    <Typography variant="h5" fontWeight="bold">
                        Gantt Chart
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
                    {event.length > 0 ? (
                        <Box
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.06)',
                                borderRadius: 4,
                                p: 2,
                                backdropFilter: 'blur(12px)',
                                width: '100%',
                                maxWidth: 2000,
                                overflowX: 'auto',
                                '& canvas': {
                                    background: 'white',
                                },
                                '& .bar-label': {
                                    display: 'none',
                                },
                                '& .tooltip-text': {
                                    display: 'none',
                                },
                                '& .gantt-container .task-list': {
                                    display: 'none !important',
                                },
                                '& .gantt-container .task-list-header': {
                                    display: 'none !important',
                                },
                                '& .calendar text': {
                                    fontSize: '0.75rem',
                                },
                            }}
                        >
                            <Gantt
                                onClick={handleEventClick}
                                tasks={event as any}
                                columnWidth={100}
                                viewMode={view}
                                listCellWidth=""
                            />
                        </Box>
                    ) : (
                        <Typography sx={{color: 'white', textAlign: 'center', mt: 4}}>
                            No valid activities to display.
                        </Typography>
                    )}
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