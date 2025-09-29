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
    startTime: string | null;
    endTime: string | null;
    dependsOnEventId: string | null;
    type: "event" | "task";
}

export default function GanttChartPage() {
    const [view] = useState(ViewMode.Month);
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [event, setEvent] = useState<ActivityResponse[]>([]);
    const [clubOptions, setClubOptions] = useState<{ clubId: string; clubName: string }[]>([]);
    const [selectedClub, setSelectedClub] = useState<string>("");

    const handleEventClick = (event: any) => {
        if (event.realType === 'event') {
            navigate(`${PAGE_UPDATE_EVENT}/?eventId=${event.id}`);
        } else if (event.type === 'task') {
            navigate(`${PAGE_UPDATE_TASK}?taskId=${event.id}`);
        }
    };

    // Fetch clubs on mount
    useEffect(() => {
        async function fetchClubs() {
            try {
                const response = await fetch(`${config.apiBaseUrl}/users/${userIdSignal.value}/clubs`);
                if (response.ok) {
                    const data = await response.json();
                    setClubOptions(data);
                    if (data.length > 0) {
                        setSelectedClub(data[0].clubId);   // drive from state
                        clubIdSignal.value = data[0].clubId; // optional global sync
                    }
                } else {
                    setShowError(true);
                }
            } catch {
                setShowError(true);
            }
        }

        fetchClubs();
    }, []);

    // Fetch activities when selectedClub changes
    useEffect(() => {
        if (!selectedClub) return;

        async function fetchActivities() {
            try {
                const response = await fetch(`${config.apiBaseUrl}/clubs/activity?clubId=${selectedClub}`);
                if (response.ok) {
                    const rawData = await response.json();
                    const parsed = rawData.map((activity: ActivityResponse): any => {
                        const start = activity.startTime
                            ? new Date(activity.startTime)
                            : activity.endTime
                                ? new Date(activity.endTime)
                                : new Date();

                        let end = activity.endTime ? new Date(activity.endTime) : new Date(start);
                        if (end.getTime() === start.getTime()) {
                            end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
                        }
                        return {
                            id: activity.activityId,
                            name: activity.activityTitle,
                            start,
                            end,
                            type: "task",
                            realType: activity.type,
                            dependencies: activity.dependsOnEventId ? [activity.dependsOnEventId] : [],
                            progress: 0,
                        };
                    });
                    setEvent([...parsed]);
                } else {
                    setShowError(true);
                }
            } catch {
                setShowError(true);
            }
        }

        fetchActivities();
    }, [selectedClub]);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const newClubId = event.target.value as string;
        setSelectedClub(newClubId);      // React state drives UI
        clubIdSignal.value = newClubId;  // optional global sync
    };

    return (
        <LayoutContainer>
            <Box
                sx={{
                    minHeight: '100vh',
                    pl: {xs: 0, md: '240px'},
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
                                minWidth: 250,
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
                                key={selectedClub}
                                onClick={handleEventClick}
                                tasks={event as any}
                                columnWidth={85}
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
