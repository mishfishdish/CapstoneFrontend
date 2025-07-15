import {Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, Typography,} from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CreateIcon from '@mui/icons-material/Create';
import LayoutContainer from "../common/LayoutContainer.tsx";
import {useNavigate} from "react-router-dom";
import {PAGE_ADD_MEMBER, PAGE_CREATE_CLUB} from "../PathConstants.tsx";
import {useEffect, useState} from "react";
import {clubIdSignal, userIdSignal} from ".././store/sessionSignal.ts";
import config from "../../config.ts";


export default function SettingsPage() {
    const navigate = useNavigate();
    const [clubs, setClubs] = useState([]);
    const [selectedClub, setSelectedClub] = useState('');

    useEffect(() => {
        async function fetchClubs() {
            try {
                const response = await fetch(`${config.apiBaseUrl}/users/${userIdSignal.value}/clubs`);
                if (response.ok) {
                    const data = await response.json();
                    setClubs(data);
                } else {
                    console.error('Failed to fetch clubs');
                }
            } catch (err) {
                console.error('Error:', err);
            }
        }

        fetchClubs();
    }, []);

    const handleAddMembers = () => {
        if (selectedClub) {
            clubIdSignal.value = selectedClub;
            navigate(PAGE_ADD_MEMBER);
        }
    };

    return (
        <LayoutContainer>
            <Container
                maxWidth="md"
                sx={{
                    display: 'flex',
                    flexDirection: {xs: 'column', md: 'row'},
                    gap: 4,
                    bgcolor: 'rgba(255,255,255,0.05)',
                    borderRadius: 4,
                    p: 4,
                    boxShadow: 4,
                }}
            >
                {/* Club Settings */}
                <Paper elevation={3} sx={{flex: 1, p: 4, borderRadius: 3, bgcolor: '#fff'}}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Club Settings
                    </Typography>
                    <FormControl fullWidth sx={{mb: 3}}>
                        <InputLabel id="club-select-label">Select Club</InputLabel>
                        <Select
                            labelId="club-select-label"
                            value={selectedClub}
                            onChange={(e) => setSelectedClub(e.target.value)}
                        >
                            {clubs.map((club: any) => (
                                <MenuItem key={club.clubId} value={club.clubId}>
                                    {club.clubName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<GroupAddIcon/>}
                        sx={{
                            textTransform: 'none',
                            bgcolor: 'grey.900',
                            '&:hover': {bgcolor: 'grey.800'},
                        }}
                        onClick={handleAddMembers}
                        disabled={!selectedClub}
                    >
                        Add Members To Club
                    </Button>
                </Paper>
                *
                {/* Account Settings */}
                <Paper elevation={3} sx={{flex: 1, p: 4, borderRadius: 3, bgcolor: '#fff'}}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Account Settings
                    </Typography>
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<CreateIcon/>}
                        onClick={() => navigate(PAGE_CREATE_CLUB)}
                        sx={{
                            textTransform: 'none',
                            bgcolor: 'grey.900',
                            '&:hover': {bgcolor: 'grey.800'},
                        }}
                    >
                        Create New Club
                    </Button>
                </Paper>
            </Container>
        </LayoutContainer>
    );
}