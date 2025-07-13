// pages/CreateClubPage.jsx
import {Box, Button, IconButton, MenuItem, Select, Stack, TextField, Typography,} from '@mui/material';
import {useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import LayoutContainer from "../../common/LayoutContainer";

export default function CreateClubPage() {
    const [invitees, setInvitees] = useState([{email: '', role: 'Member'}]);
    const [clubName, setClubName] = useState('');
    const [clubDesc, setClubDesc] = useState('');

    const handleInviteChange = (index, field, value) => {
        const updated = [...invitees];
        updated[index][field] = value;
        setInvitees(updated);
    };

    const handleAddInvitee = () => {
        setInvitees([...invitees, {email: '', role: 'Member'}]);
    };

    const handleRemoveInvitee = (index) => {
        const updated = [...invitees];
        updated.splice(index, 1);
        setInvitees(updated);
    };

    const handleCancel = () => {
        // e.g. navigate back
    };

    const handleCreate = () => {
        // Submit logic here
    };

    return (
        <LayoutContainer>
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 500,
                    mx: 'auto',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    p: 4,
                    borderRadius: 3,
                    backdropFilter: 'blur(10px)',
                }}
            >
                <Typography variant="h5" fontWeight="bold" color="white" gutterBottom>
                    Create A Club
                </Typography>

                <TextField
                    fullWidth
                    label="Club Name"
                    value={clubName}
                    onChange={(e) => setClubName(e.target.value)}
                    variant="filled"
                    sx={{mb: 2, bgcolor: 'white', borderRadius: 1}}
                />

                <TextField
                    fullWidth
                    label="Club Description"
                    value={clubDesc}
                    onChange={(e) => setClubDesc(e.target.value)}
                    variant="filled"
                    sx={{mb: 4, bgcolor: 'white', borderRadius: 1}}
                />

                <Typography variant="subtitle1" fontWeight="bold" color="white" gutterBottom>
                    Invite Members
                </Typography>

                <Stack spacing={2} sx={{mb: 2}}>
                    {invitees.map((invitee, index) => (
                        <Stack direction="row" spacing={1} key={index}>
                            <TextField
                                fullWidth
                                placeholder="Email"
                                value={invitee.email}
                                onChange={(e) => handleInviteChange(index, 'email', e.target.value)}
                                variant="filled"
                                sx={{bgcolor: 'white', borderRadius: 1}}
                            />
                            <Select
                                value={invitee.role}
                                onChange={(e) => handleInviteChange(index, 'role', e.target.value)}
                                variant="filled"
                                sx={{minWidth: 100, bgcolor: 'white', borderRadius: 1}}
                            >
                                <MenuItem value="Member">Member</MenuItem>
                                <MenuItem value="Admin">Admin</MenuItem>
                            </Select>
                            {invitees.length > 1 && (
                                <IconButton onClick={() => handleRemoveInvitee(index)}>
                                    <DeleteIcon sx={{color: 'white'}}/>
                                </IconButton>
                            )}
                        </Stack>
                    ))}
                </Stack>

                <Button
                    variant="outlined"
                    startIcon={<AddIcon/>}
                    fullWidth
                    onClick={handleAddInvitee}
                    sx={{
                        mb: 3,
                        color: 'white',
                        borderColor: 'white',
                        '&:hover': {
                            borderColor: 'white',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                        },
                    }}
                >
                    Add More
                </Button>

                <Stack direction="row" spacing={2}>
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={handleCancel}
                        startIcon={<DeleteIcon/>}
                        sx={{
                            color: 'white',
                            borderColor: 'white',
                            '&:hover': {
                                borderColor: 'white',
                                backgroundColor: 'rgba(255,255,255,0.1)',
                            },
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleCreate}
                        startIcon={<EditIcon/>}
                        sx={{
                            textTransform: 'none',
                            bgcolor: 'grey.900',
                            '&:hover': {
                                bgcolor: 'grey.800',
                            },
                        }}
                    >
                        Create
                    </Button>
                </Stack>
            </Box>
        </LayoutContainer>
    );
}