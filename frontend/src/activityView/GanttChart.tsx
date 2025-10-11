import {Alert, Box, FormControl, InputLabel, MenuItem, Select, Snackbar, Typography} from '@mui/material';
import {useEffect, useMemo, useState} from 'react';
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

type TaskShape = {
    id: string;
    name: string;
    start: Date;
    end: Date;
    type: "task" | "project" | "milestone";
    realType?: "event" | "task";
    dependencies?: string[];
    progress?: number;
    styles?: {
        backgroundColor?: string;
        backgroundSelectedColor?: string;
        progressColor?: string;
        progressSelectedColor?: string;
    };
    __sentinel__?: boolean;
};

export default function GanttChartPage() {
    const [view] = useState(ViewMode.Month);
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [activities, setActivities] = useState<ActivityResponse[]>([]);
    const [clubOptions, setClubOptions] = useState<{ clubId: string; clubName: string }[]>([]);
    const [selectedClub, setSelectedClub] = useState<string>("");

    const handleEventClick = (task: TaskShape) => {
        // Ignore sentinel tasks
        if (task.__sentinel__) return;

        if (task.realType === 'event') {
            navigate(`${PAGE_UPDATE_EVENT}/?eventId=${task.id}`);
        } else if (task.realType === 'task') {
            navigate(`${PAGE_UPDATE_TASK}?taskId=${task.id}`);
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
                        setSelectedClub(data[0].clubId);
                        clubIdSignal.value = data[0].clubId;
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
                    const parsed: TaskShape[] = rawData.map((activity: ActivityResponse) => {
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
                    // @ts-ignore
                    parsed.sort((a, b) => a.start.getTime() - b.start.getTime());
                    setActivities(parsed);
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
        setSelectedClub(newClubId);
        clubIdSignal.value = newClubId;
    };

    // ----- Force timeline: 3 months before and 4 months after "now" -----
    // @ts-ignore
    const tasksForChart = useMemo<TaskShape[]>(() => {
        if (!activities.length) return [];

        const now = new Date();

        // Start bound: first day of the month, 3 months ago
        const startBound = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);

        // End bound: last day of the month, 4 months ahead
        const endBound = new Date(now.getFullYear(), 12, 1, 0, 0, 0, 0);

        // Invisible sentinel tasks to enforce range
        const sentinelStyle = {
            backgroundColor: 'rgba(0,0,0,0)',
            backgroundSelectedColor: 'rgba(0,0,0,0)',
            progressColor: 'rgba(0,0,0,0)',
            progressSelectedColor: 'rgba(0,0,0,0)',
        };

        const startSentinel: TaskShape = {
            id: '__range_start__',
            name: '',
            start: startBound,
            end: new Date(startBound.getTime() + 24 * 60 * 60 * 1000),
            type: 'task',
            progress: 0,
            styles: sentinelStyle,
            __sentinel__: true,
        };

        const endSentinel: TaskShape = {
            id: '__range_end__',
            name: '',
            start: new Date(2026, 1, 1, 0, 0, 0, 0),   // March 1, 2026
            end: new Date(2026, 1, 31, 23, 59, 59, 999), // March 31, 2026
            type: 'task',
            progress: 0,
            styles: sentinelStyle,
            __sentinel__: true,
        };

        return [startSentinel, ...activities, endSentinel];
    }, [activities]);

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
                    {tasksForChart.length > 0 ? (
                        <Box
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.06)',
                                borderRadius: 4,
                                p: 2,
                                backdropFilter: 'blur(12px)',
                                width: '100%',
                                maxWidth: 2000,
                                overflowX: 'auto',
                                '& .calendar text': {fontSize: '0.75rem'},
                            }}
                        >
                            <Gantt
                                key={selectedClub}
                                onClick={handleEventClick as any}
                                tasks={tasksForChart as any}
                                columnWidth={65}
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
