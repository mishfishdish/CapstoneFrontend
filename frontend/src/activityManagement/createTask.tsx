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

export default function CreateTaskPage() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [clubs, setClubs] = useState<string[]>([]);
    const [dueDate, setDueDate] = useState<Date | null>(new Date());
    const [parentEvent, setParentEvent] = useState('');
    const [notify, setNotify] = useState(false);
    const [notifyMinutes, setNotifyMinutes] = useState('10');

    const handleSubmit = () => {
        // handle task creation logic here
        console.log({title, description, priority, clubs, dueDate, parentEvent, notify, notifyMinutes});
    };

    return (
        <LayoutContainer>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    ml: '240px', // shift to the right if your sidebar is fixed and 240px wide
                    px: 2,
                }}
            >
                <Box
                    sx={{
                        maxWidth: 600,
                        mx: 'auto',
                        mt: 6,
                        p: 4,
                        borderRadius: 4,
                        bgcolor: 'rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(16px)',
                        color: 'white',
                    }}
                >
                    <Typography variant="h5" gutterBottom fontWeight={600}>
                        Create a new task
                    </Typography>

                    <TextField
                        fullWidth
                        label="Task Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        variant="filled"
                        sx={{my: 2, bgcolor: 'white', borderRadius: 1}}
                    />

                    <Typography fontSize={14} fontWeight={500}>
                        Date to complete
                    </Typography>
                    <DateTimePicker
                        value={dueDate}
                        onChange={setDueDate}
                        sx={{my: 2, width: '100%', bgcolor: 'white', borderRadius: 1}}
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
                        <InputLabel>Task Priority</InputLabel>
                        <Select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <MenuItem value="low">Low</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="high">High</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Task Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        multiline
                        minRows={3}
                        variant="filled"
                        sx={{my: 2, bgcolor: 'white', borderRadius: 1}}
                    />

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