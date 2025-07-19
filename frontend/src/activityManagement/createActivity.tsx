import {Box, ButtonBase, Grid, Typography,} from '@mui/material';
import {CalendarMonth, CheckCircleOutline, CloudUpload} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';
import LayoutContainer from '../common/LayoutContainer.tsx';
import {PAGE_CREATE_EVENT, PAGE_CREATE_TASK} from "../PathConstants.tsx";

export default function CreateActivityLandingPage() {
    const navigate = useNavigate();

    const actions = [
        {
            label: 'Create a new event',
            icon: <CalendarMonth sx={{fontSize: 50}}/>,
            onClick: () => navigate(PAGE_CREATE_EVENT),
        },
        {
            label: 'Create a new task',
            icon: <CheckCircleOutline sx={{fontSize: 50}}/>,
            onClick: () => navigate(PAGE_CREATE_TASK),
        },
        {
            label: 'Import from CSV',
            icon: <CloudUpload sx={{fontSize: 50}}/>,
            onClick: () => navigate('/import'),
        },
    ];

    // @ts-ignore
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
                <Grid container spacing={4} justifyContent="center">
                    {actions.map((action, index) => (
                        <Grid item key={index} xs={12 as const} sm={6 as const} md={4 as const}>
                            <ButtonBase
                                onClick={action.onClick}
                                sx={{
                                    width: 200,
                                    height: 220,
                                    flexDirection: 'column',
                                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: 3,
                                    p: 3,
                                    color: 'white',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                                    backdropFilter: 'blur(12px)',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 6px 24px rgba(0,0,0,0.6)',
                                    },
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                {action.icon}
                                <Typography variant="subtitle1" sx={{mt: 2, fontWeight: 500}}>
                                    {action.label}
                                </Typography>
                            </ButtonBase>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </LayoutContainer>
    );
}