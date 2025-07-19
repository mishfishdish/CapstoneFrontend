import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {useState} from 'react';
import LayoutContainer from '../common/LayoutContainer.tsx';

export default function CreateEventPage() {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [clubs, setClubs] = useState<string[]>([]);
    const [parentEvent, setParentEvent] = useState('');
    const [description, setDescription] = useState('');
    const [notify, setNotify] = useState(false);
    const [notifyMinutes, setNotifyMinutes] = useState('10');

    const handleSubmit = () => {
        console.log({
            startDate,
            endDate,
            title,
            location,
            clubs,
            parentEvent,
            description,
            notify,
            notifyMinutes,
        });
    };

    return (
        <LayoutContainer>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    ml: '240px',
                    px: 2,
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: 600,
                        p: 4,
                        borderRadius: 4,
                        bgcolor: 'rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(16px)',
                        color: 'white',
                        boxShadow: '0px 4px 20px rgba(0,0,0,0.3)',
                    }}
                >
                    <Typography variant="h5" gutterBottom fontWeight={600}>
                        Create a new event
                    </Typography>

                    <Typography fontSize={14} fontWeight={500}>
                        Start Date
                    </Typography>
                    <DateTimePicker
                        value={startDate}
                        onChange={setStartDate}
                        sx={{my: 2, width: '100%', bgcolor: 'white', borderRadius: 1}}
                    />

                    <Typography fontSize={14} fontWeight={500}>
                        End Date
                    </Typography>
                    <DateTimePicker
                        value={endDate}
                        onChange={setEndDate}
                        sx={{my: 2, width: '100%', bgcolor: 'white', borderRadius: 1}}
                    />

                    <TextField
                        fullWidth
                        label="Event Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        variant="filled"
                        sx={{my: 2, bgcolor: 'white', borderRadius: 1}}
                    />

                    <TextField
                        fullWidth
                        label="Event Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        variant="filled"
                        sx={{my: 2, bgcolor: 'white', borderRadius: 1}}
                    />

                    <FormControl fullWidth variant="filled" sx={{my: 2, bgcolor: 'white', borderRadius: 1}}>
                        <InputLabel>Clubs involved</InputLabel>
                        <Select
                            multiple
                            value={clubs}
                            onChange={(e) => setClubs(e.target.value as string[])}
                        >
                            <MenuItem value="club-1">Club 1</MenuItem>
                            <MenuItem value="club-2">Club 2</MenuItem>
                            <MenuItem value="club-3">Club 3</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth variant="filled" sx={{my: 2, bgcolor: 'white', borderRadius: 1}}>
                        <InputLabel>Parent Event</InputLabel>
                        <Select
                            value={parentEvent}
                            onChange={(e) => setParentEvent(e.target.value)}
                        >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value="event-1">Event 1</MenuItem>
                            <MenuItem value="event-2">Event 2</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Event Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        multiline
                        minRows={3}
                        variant="filled"
                        sx={{my: 2, bgcolor: 'white', borderRadius: 1}}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={notify}
                                onChange={(e) => setNotify(e.target.checked)}
                                sx={{color: 'white'}}
                            />
                        }
                        label="Notify Event Via Email"
                    />

                    {notify && (
                        <FormControl fullWidth variant="filled" sx={{my: 2, bgcolor: 'white', borderRadius: 1}}>
                            <InputLabel>Notify Time</InputLabel>
                            <Select
                                value={notifyMinutes}
                                onChange={(e) => setNotifyMinutes(e.target.value)}
                            >
                                <MenuItem value="5">5 minutes before</MenuItem>
                                <MenuItem value="10">10 minutes before</MenuItem>
                                <MenuItem value="30">30 minutes before</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleSubmit}
                        sx={{
                            mt: 3,
                            bgcolor: 'black',
                            color: 'white',
                            '&:hover': {
                                bgcolor: '#333',
                            },
                        }}
                    >
                        Create event
                    </Button>
                </Box>
            </Box>
        </LayoutContainer>
    );
}