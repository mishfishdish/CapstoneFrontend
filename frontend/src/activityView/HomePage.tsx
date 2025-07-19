import {Box, Button, Paper, Typography,} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LayoutContainer from '../common/LayoutContainer';
import {useNavigate} from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendarStyles.css'; // Custom calendar styles

export default function TaskHomePage() {
    const navigate = useNavigate();

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
                        Hi Matthew 👋
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
                            <Typography>• Sponsorship Meeting — <strong>2:00 PM</strong></Typography>
                            <Typography>• MAC × MAPS Workshop — <strong>11:00 AM</strong></Typography>
                            <Typography>• Portfolio Meetup — <strong>10:00 PM</strong></Typography>
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
                            <Typography sx={{mb: 2}}>5 out of 12 activities completed</Typography>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon/>}
                                sx={{
                                    bgcolor: 'grey.900',
                                    '&:hover': {bgcolor: 'grey.800'},
                                    textTransform: 'none',
                                    color: 'white',
                                }}
                                onClick={() => navigate('/create-activity')}
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
                            <Typography>• Matthew created a new event.</Typography>
                            <Typography>• Michelle updated MAC × MAPS Workshop event.</Typography>
                            <Typography>• Matthew updated Sponsorship contract task.</Typography>
                        </Paper>
                    </Box>
                </Box>
            </Box>
        </LayoutContainer>
    );
}