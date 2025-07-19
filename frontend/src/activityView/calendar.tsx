import {Box, MenuItem, Select, Typography,} from '@mui/material';
import {Calendar, dateFnsLocalizer,} from 'react-big-calendar';
import {format, getDay, parse, startOfWeek} from 'date-fns';
import {useState} from 'react';
import LayoutContainer from '../common/LayoutContainer.tsx';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {enAU} from "date-fns/locale";

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

const events = [
    {
        title: 'Club Meeting',
        start: new Date(2025, 6, 21, 9, 0),
        end: new Date(2025, 6, 21, 10, 30),
    },
    {
        title: 'Workshop',
        start: new Date(2025, 6, 23, 13, 0),
        end: new Date(2025, 6, 23, 15, 0),
    },
    {
        title: 'Presentation',
        start: new Date(2025, 6, 25, 11, 0),
        end: new Date(2025, 6, 25, 12, 0),
    },
];

export default function CalendarViewPage() {
    const [selectedClub, setSelectedClub] = useState('Monash Club Association');

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
                    <Select
                        value={selectedClub}
                        onChange={(e) => setSelectedClub(e.target.value)}
                        sx={{
                            bgcolor: 'rgba(255,255,255,0.08)',
                            color: 'white',
                            borderRadius: 2,
                            minWidth: {xs: '100%', sm: 250},
                            '.MuiSvgIcon-root': {color: 'white'},
                        }}
                    >
                        <MenuItem value="Monash Club Association">Monash Club Association</MenuItem>
                        <MenuItem value="Science Society">Science Society</MenuItem>
                        <MenuItem value="Art Club">Art Club</MenuItem>
                    </Select>
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

                        }}
                    >
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            views={['month']}
                            popup
                            style={{height: '100%'}}
                        />
                    </Box>
                </Box>
            </Box>
        </LayoutContainer>
    );
}