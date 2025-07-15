import {Alert, Box, Button, IconButton, MenuItem, Select, Snackbar, Stack, TextField, Typography,} from '@mui/material';
import {useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import LayoutContainer from "../common/LayoutContainer.tsx";
import {useNavigate} from "react-router-dom";
import {clubIdSignal, userIdSignal} from "../store/sessionSignal.ts";
import config from "../../config.ts";

// ✅ Define Invitee type
type Invitee = {
    email: string;
    role: 'Member' | 'Admin';
};

export default function CreateClubPage() {
    const navigate = useNavigate();
    const [invitees, setInvitees] = useState<Invitee[]>([
        {email: '', role: 'Member'},
    ]);
    const [clubName, setClubName] = useState('');
    const [clubDesc, setClubDesc] = useState('');
    const [failures, setFailures] = useState<string[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    // ✅ Fully typed handler
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
        setInvitees([...invitees, {email: '', role: 'Member'}]);
    };

    const handleRemoveInvitee = (index: number) => {
        const updated = [...invitees];
        updated.splice(index, 1);
        setInvitees(updated);
    };

    const handleCancel = () => {
        navigate(-1)
    };

    const handleCreate = async () => {

        try {
            // Step 1: Create the club
            const clubResponse = await fetch(`${config.apiBaseUrl}/clubs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: clubName, description: clubDesc}),
            });

            if (!clubResponse.ok) {
                setFailures([...failures, "Failed to Create Club"])
                setSnackbarOpen(true);
                return; // Don't proceed if club creation fails
            }

            const {clubId} = await clubResponse.json();
            clubIdSignal.value = clubId;

            // Step 2: add user to club

            const response = await fetch(`${config.apiBaseUrl}/clubs/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({clubId, username: userIdSignal.value, role: 'ADMIN'}),
            });

            if (!response.ok) {
                setFailures([...failures, `Could not add user to club`])
                setSnackbarOpen(true);
                return; // Don't proceed if club creation fails

            }

            // Step 2: Invite members to the club
            for (const {email, role} of invitees) {
                const response = await fetch(`${config.apiBaseUrl}/clubs/invite`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({clubId, email, role}),
                });

                if (!response.ok) {
                    setFailures([...failures, `${email} could not invite`])
                }
            }

            // Step 3: Show outcome
            if (failures.length > 0) {
                setSnackbarOpen(true);
            } else {
                alert('Club created and all members invited successfully!');
            }

        } catch (err) {
            console.error('Unexpected error during club creation:', err);
            setSnackbarOpen(true);
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
                                onChange={(e) => handleInviteChange(index, 'role', e.target.value as 'Member' | 'Admin')}
                                variant="filled"
                                sx={{width: 140, bgcolor: 'white', borderRadius: 1}}
                            >
                                <MenuItem value="MEMBER">MEMBER</MenuItem>
                                <MenuItem value="ADMIN">ADMIN</MenuItem>
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
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={() => setSnackbarOpen(false)}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                >
                    <Alert severity="error" onClose={() => {
                        setSnackbarOpen(false)
                        setFailures([]);
                    }} sx={{width: '100%'}}>
                        Failed to invite: {failures.join(', ')}
                    </Alert>
                </Snackbar>
            </Box>
        </LayoutContainer>
    );
}