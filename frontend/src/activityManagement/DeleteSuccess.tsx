import {Box, Button, Paper, Typography} from '@mui/material';
import LayoutContainer from '../common/LayoutContainer';
import {useNavigate} from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {PAGE_HOME} from "../PathConstants.tsx";


export default function ActivityDeletePage() {
    const navigate = useNavigate();

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
                    py: 6,
                    color: 'white',
                }}
            >
                <Paper
                    elevation={4}
                    sx={{
                        p: 6,
                        borderRadius: 4,
                        textAlign: 'center',
                        bgcolor: 'rgba(255,255,255,0.05)',
                        backdropFilter: 'blur(12px)',
                        color: 'white',
                        maxWidth: 600,
                    }}
                >
                    <DeleteForeverIcon sx={{fontSize: 80, color: '#FFFFFF', mb: 2}}/>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Activity successfully deleted
                    </Typography>

                    <Button
                        variant="contained"
                        sx={{
                            mt: 3,
                            bgcolor: 'grey.900',
                            '&:hover': {bgcolor: 'grey.800'},
                            textTransform: 'none',
                            color: 'white',
                            px: 4,
                            py: 1.5,
                            fontWeight: 'bold',
                        }}
                        onClick={() => navigate(PAGE_HOME)}
                    >
                        Go to dashboard
                    </Button>
                </Paper>
            </Box>
        </LayoutContainer>
    );
}