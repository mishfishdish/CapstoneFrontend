// pages/SettingsPage.jsx
import {Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, Typography,} from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CreateIcon from '@mui/icons-material/Create';
import LayoutContainer from "../../common/LayoutContainer";

export default function SettingsPage() {
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
                <Paper
                    elevation={3}
                    sx={{flex: 1, p: 4, borderRadius: 3, bgcolor: '#fff'}}
                >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Club Settings
                    </Typography>
                    <FormControl fullWidth sx={{mb: 3}}>
                        <InputLabel id="club-select-label">Select Club</InputLabel>
                        <Select labelId="club-select-label" defaultValue="monash">
                            <MenuItem value="monash">Monash Club Association</MenuItem>
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
                    >
                        Add Members To Club
                    </Button>
                </Paper>

                {/* Account Settings */}
                <Paper
                    elevation={3}
                    sx={{flex: 1, p: 4, borderRadius: 3, bgcolor: '#fff'}}
                >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Account Settings
                    </Typography>
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<CreateIcon/>}
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