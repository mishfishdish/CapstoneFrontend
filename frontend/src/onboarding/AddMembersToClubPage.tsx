import {Alert, Box, Button, IconButton, MenuItem, Select, Snackbar, Stack, TextField, Typography,} from '@mui/material';
import {useState} from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LayoutContainer from '../common/LayoutContainer';
import {clubIdSignal} from "../store/sessionSignal.ts";
import {useNavigate} from "react-router-dom";
import config from "../../config.ts"; // update this import if needed

type Invitee = {
    email: string;
    role: 'MEMBER' | 'ADMIN';
};

export default function AddMembersPage() {
    const navigate = useNavigate();
    const [invitees, setInvitees] = useState<Invitee[]>([
        {email: '', role: 'MEMBER'},
        {email: '', role: 'MEMBER'},
    ]);
    const [failedInvites, setFailedInvites] = useState<string[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleInviteChange = (
        index: number,
        field: keyof Invitee,
        value: Invitee[keyof Invitee]
    ) => {
        const updated = [...invitees];
        updated[index] = {...updated[index], [field]: value};
        setInvitees(updated);
    };

    const handleAddInvitee = () => {
        setInvitees([...invitees, {email: '', role: 'MEMBER'}]);
    };

    const handleRemoveInvitee = (index: number) => {
        const updated = [...invitees];
        updated.splice(index, 1);
        setInvitees(updated);
    };

    const handleCancel = () => {
        navigate(-1)
    };

    const handleSubmit = async () => {
        const failures: string[] = [];

        for (const invitee of invitees) {
            const {email, role} = invitee;

            const response = await fetch(`${config.apiBaseUrl}/clubs/invite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({clubId: clubIdSignal.value, email, role}),
            });

            if (!response.ok) {
                failures.push(email);
            }
        }

        if (failures.length > 0) {
            setFailedInvites(failures);
            setSnackbarOpen(true);
        } else {
            alert('All members invited successfully!');
        }
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
                                onChange={(e) => handleInviteChange(index, 'role', e.target.value as 'Member' | 'Admin')}
                                variant="filled"
                                sx={{width: 140, bgcolor: 'white', borderRadius: 1}}
                            >
                                <MenuItem value="Member">Member</MenuItem>
                                <MenuItem value="Admin">Admin&nbsp;&nbsp;&nbsp;</MenuItem>
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
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={() => setSnackbarOpen(false)}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                >
                    <Alert severity="error" onClose={() => setSnackbarOpen(false)} sx={{width: '100%'}}>
                        Failed to invite: {failedInvites.join(', ')}
                    </Alert>
                </Snackbar>
            </Box>
        </LayoutContainer>
    );
}