// pages/AddMembersPage.jsx
import {Box, Button, IconButton, MenuItem, Select, Stack, TextField, Typography,} from '@mui/material';
import {useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CancelIcon from '@mui/icons-material/Cancel';
import LayoutContainer from "../../common/LayoutContainer";

export default function AddMembersPage() {
    const [invitees, setInvitees] = useState([
        {email: '', role: 'Member'},
        {email: '', role: 'Member'},
    ]);

    const handleInviteChange = (index, field, value) => {
        const updated = [...invitees];
        // @ts-ignore
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

    const handleSubmit = () => {
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
                    Add Members To Club
                </Typography>

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
                        startIcon={<CancelIcon/>}
                        onClick={handleCancel}
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
                        startIcon={<GroupAddIcon/>}
                        onClick={handleSubmit}
                        sx={{
                            textTransform: 'none',
                            bgcolor: 'grey.900',
                            '&:hover': {
                                bgcolor: 'grey.800',
                            },
                        }}
                    >
                        Add
                    </Button>
                </Stack>
            </Box>
        </LayoutContainer>
    );
}