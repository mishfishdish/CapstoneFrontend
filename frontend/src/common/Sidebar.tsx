// components/Sidebar.jsx
import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography,} from '@mui/material';
import {BarChart, CalendarMonth, Checklist, Description, Home, Settings,} from '@mui/icons-material';
import {useLocation, useNavigate} from 'react-router-dom';
import {PAGE_CLUB_SETTINGS} from "../PathConstants.tsx";

const navItems = [
    {label: 'Home Dashboard', icon: <Home/>, path: '/'},
    {label: 'Calendar', icon: <CalendarMonth/>, path: '/calendar'},
    {label: 'Gantt Chart', icon: <Checklist/>, path: '/gantt'},
    {label: 'Database View', icon: <Description/>, path: '/database'},
    {label: 'Analytic Reports', icon: <BarChart/>, path: '/reports'},
    {label: 'Settings', icon: <Settings/>, path: PAGE_CLUB_SETTINGS},
];

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Box sx={{width: 240, bgcolor: '#1a1a2e', height: '100vh', color: 'white'}}>
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
        </Box>
    );
}