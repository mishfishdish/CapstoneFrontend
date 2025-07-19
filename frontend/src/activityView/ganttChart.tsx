import {Box, MenuItem, Select, Typography} from '@mui/material';
import {useState} from 'react';
import {Gantt, ViewMode} from 'gantt-task-react';
import LayoutContainer from '../common/LayoutContainer.tsx';
import 'gantt-task-react/dist/index.css';

const tasks = [
    {
        start: new Date('2024-03-01'),
        end: new Date('2024-03-02'),
        name: 'Schedule event',
        id: 'Task 1',
        type: 'task',
        progress: 100,
        styles: {backgroundColor: '#f99', progressColor: '#f99'},
    },
    {
        start: new Date('2024-03-02'),
        end: new Date('2024-03-04'),
        name: 'Raise sponsors',
        id: 'Task 2',
        type: 'task',
        progress: 100,
        dependencies: ['Task 1'],
        styles: {backgroundColor: '#f99', progressColor: '#f99'},
    },
    {
        start: new Date('2024-03-03'),
        end: new Date('2024-03-05'),
        name: 'Do catering',
        id: 'Task 3',
        type: 'task',
        progress: 60,
        dependencies: ['Task 2'],
        styles: {backgroundColor: '#f99', progressColor: '#f99'},
    },
    {
        start: new Date('2024-03-01'),
        end: new Date('2024-03-02'),
        name: 'Group meeting 1',
        id: 'Task 4',
        type: 'task',
        progress: 100,
        styles: {backgroundColor: '#ffc57a', progressColor: '#ffc57a'},
    },
    {
        start: new Date('2024-03-04'),
        end: new Date('2024-03-05'),
        name: 'Find venue',
        id: 'Task 5',
        type: 'task',
        progress: 100,
        dependencies: ['Task 4'],
        styles: {backgroundColor: '#ffc57a', progressColor: '#ffc57a'},
    },
    {
        start: new Date('2024-03-04'),
        end: new Date('2024-03-06'),
        name: 'Group meeting 2',
        id: 'Task 6',
        type: 'task',
        progress: 100,
        dependencies: ['Task 5'],
        styles: {backgroundColor: '#ffc57a', progressColor: '#ffc57a'},
    },
    {
        start: new Date('2024-03-06'),
        end: new Date('2024-03-08'),
        name: 'Rehearsal',
        id: 'Task 7',
        type: 'task',
        progress: 70,
    },
    {
        start: new Date('2024-03-08'),
        end: new Date('2024-03-10'),
        name: 'Coding Association Orientation',
        id: 'Task 8',
        type: 'task',
        progress: 30,
        dependencies: ['Task 7'],
        styles: {backgroundColor: '#ffc57a', progressColor: '#ffc57a'},
    },
];

export default function GanttChartPage() {
    const [view, setView] = useState(ViewMode.Month);

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
                    <Select
                        value="Month"
                        sx={{
                            bgcolor: 'rgba(255,255,255,0.08)',
                            color: 'white',
                            borderRadius: 2,
                            minWidth: {xs: '100%', sm: 400},
                            '.MuiSvgIcon-root': {color: 'white'},
                        }}
                    >
                        <MenuItem value={ViewMode.Day}>Day</MenuItem>
                        <MenuItem value={ViewMode.Week}>Week</MenuItem>
                        <MenuItem value={ViewMode.Month}>Month</MenuItem>
                    </Select>
                </Box>

                <Box sx={{display: 'flex', justifyContent: 'center'}}>
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
                                fontSize: '0.75rem', // Smaller font size
                            },
                        }}
                    >
                        <Gantt tasks={tasks as any} viewMode={view} listCellWidth=""
                        />
                    </Box>
                </Box>
            </Box>
        </LayoutContainer>
    );
}