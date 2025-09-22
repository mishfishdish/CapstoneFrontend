// components/Sidebar.jsx
import {
    Box,
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from '@mui/material';
import {AddCircleOutline, BarChart, CalendarMonth, Checklist, Description, Home, Settings,} from '@mui/icons-material';
import {useLocation, useNavigate} from 'react-router-dom';
import {
    MAIN_ANALYTICS,
    PAGE_ACTIVITY,
    PAGE_CALENDAR,
    PAGE_CLUB_SETTINGS,
    PAGE_DATABASE,
    PAGE_GANTT,
    PAGE_HOME
} from "../PathConstants.tsx";

const navItems = [
    {label: 'Home Dashboard', icon: <Home/>, path: PAGE_HOME},
    {label: 'Calendar', icon: <CalendarMonth/>, path: PAGE_CALENDAR},
    {label: 'Gantt Chart', icon: <Checklist/>, path: PAGE_GANTT},
    {label: 'Database View', icon: <Description/>, path: PAGE_DATABASE},
    {label: 'Analytic Reports', icon: <BarChart/>, path: MAIN_ANALYTICS},
    {label: 'Settings', icon: <Settings/>, path: PAGE_CLUB_SETTINGS},
];

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Box sx={{
            width: 240,
            height: '100vh', // full vertical height
            bgcolor: '#1a1a2e',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed', // ensures it stays pinned
            left: 0,
            top: 0,
            zIndex: 1300,
        }}>
            <Toolbar>
                <Typography variant="h6">SigmaSchedule</Typography>
            </Toolbar>
            <List>
                {navItems.map(({label, icon, path}) => (
                    <ListItem key={label} disablePadding>
                        <ListItemButton
                            selected={location.pathname === path}
                            onClick={() => navigate(path)}
                        >
                            <ListItemIcon sx={{color: 'white'}}>{icon}</ListItemIcon>
                            <ListItemText primary={label}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Box sx={{p: 2}}>
                <Button
                    variant="contained"
                    fullWidth
                    startIcon={<AddCircleOutline/>}
                    onClick={() => navigate(PAGE_ACTIVITY)}
                    sx={{bgcolor: '#00adb5', '&:hover': {bgcolor: '#00cfd1'}}}
                >
                    Create Activity
                </Button>
            </Box>
        </Box>
    );
}