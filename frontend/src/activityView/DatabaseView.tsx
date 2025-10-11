import {useEffect, useState} from 'react';
import {
    Alert,
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    Snackbar,
    TextField,
    Typography
} from '@mui/material';
import LayoutContainer from '../common/LayoutContainer';
import config from '../../config';
import {clubIdSignal, userIdSignal} from "../store/sessionSignal.ts";

export default function ActivityPage() {
    const [sort, setSort] = useState('Date');
    const [selectedClub, setSelectedClub] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [activities, setActivities] = useState<any[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [clubOptions, setClubOptions] = useState<{ clubId: string; clubName: string }[]>([]);
    const [showError, setShowError] = useState(false);

    // Fetch user's clubs
    useEffect(() => {
        async function fetchClubs() {
            try {
                const response = await fetch(`${config.apiBaseUrl}/users/${userIdSignal.value}/clubs`);
                if (response.ok) {
                    const data = await response.json();
                    setClubOptions(data);

                    if (data.length > 0) {
                        const defaultClubId = data[0].clubId;
                        setSelectedClub(defaultClubId);
                        clubIdSignal.value = defaultClubId;
                    }
                } else {
                    setShowError(true);
                    alert('Failed to fetch clubs');
                }
            } catch (err) {
                setShowError(true);
                alert('Failed to fetch clubs');
            }
        }

        fetchClubs();
    }, []);

    // Fetch activities whenever dependencies change
    useEffect(() => {
        if (!selectedClub) return; // Wait until a club is selected

        const fetchActivities = async () => {
            try {
                // Determine sort parameter for backend
                let sortParam = '';
                if (sort === 'Date') sortParam = 'startTime,asc';
                else if (sort === 'Title') sortParam = 'activityTitle,asc';

                const params = new URLSearchParams({
                    clubId: selectedClub,
                    search: searchQuery,
                    page: (page - 1).toString(),
                    size: '10',
                    sort: sortParam
                });

                const response = await fetch(`${config.apiBaseUrl}/clubs/activity?${params.toString()}`);
                const data = await response.json();

                setActivities(data.content || []);
                setTotalPages(data.totalPages || 1);
            } catch (error) {
                console.error('Failed to fetch activities:', error);
            }
        };

        fetchActivities();
    }, [sort, selectedClub, searchQuery, page]);

    return (
        <LayoutContainer>
            <Box
                sx={{
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    ml: {xs: 0, md: '240px'},
                    px: {xs: 2, md: 4},
                    py: {xs: 4, md: 6},
                    flexGrow: 1,
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        flexGrow: 1,
                        bgcolor: 'rgba(255,255,255,0.06)',
                        borderRadius: 4,
                        p: {xs: 2, md: 4},
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 0 20px rgba(0,0,0,0.2)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                    }}
                >
                    <Typography variant="h5" fontWeight="bold" mb={2}>
                        Compact list view
                    </Typography>

                    {/* Filters */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 2,
                            mb: 3,
                        }}
                    >
                        {clubOptions.length > 0 && (
                            <FormControl variant="outlined">
                                <InputLabel id="club-label" sx={{color: 'white'}}>Club</InputLabel>
                                <Select
                                    labelId="club-label"
                                    value={selectedClub}
                                    onChange={(e) => {
                                        setSelectedClub(e.target.value);
                                        clubIdSignal.value = e.target.value;
                                    }}
                                    label="Club"
                                    sx={{
                                        minWidth: 150,
                                        bgcolor: 'rgba(255,255,255,0.08)',
                                        color: 'white',
                                        borderRadius: 2,
                                        '.MuiSvgIcon-root': {color: 'white'},
                                    }}
                                >
                                    {clubOptions.map((c) => (
                                        <MenuItem key={c.clubId} value={c.clubId}>
                                            {c.clubName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    </Box>

                    {/* Search */}
                    <TextField
                        fullWidth
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        variant="outlined"
                        sx={{
                            mb: 3,
                            input: {color: 'black'},
                            bgcolor: 'white',
                            borderRadius: 1,
                        }}
                    />

                    {/* Activity Cards */}
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, mb: 3}}>
                        {activities.map((a) => (
                            <Box
                                key={a.activityId}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    bgcolor: 'rgba(255,255,255,0.1)',
                                    borderRadius: 2,
                                    p: 2,
                                }}
                            >
                                <Typography fontWeight="bold">{a.activityTitle}</Typography>
                                <Typography>
                                    {a.startTime
                                        ? new Date(a.startTime).toLocaleString()
                                        : new Date(a.endTime).toLocaleString()}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    {/* Pagination */}
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(_e, value) => setPage(value)}
                            sx={{
                                '& .MuiPaginationItem-root': {
                                    color: 'white',
                                    borderColor: 'white',
                                },
                                '& .Mui-selected': {
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    color: 'white',
                                },
                            }}
                        />
                    </Box>
                </Box>
            </Box>

            <Snackbar
                open={showError}
                autoHideDuration={5000}
                onClose={() => setShowError(false)}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
                <Alert onClose={() => setShowError(false)} severity="error" sx={{width: '100%'}}>
                    Activity creation failed.
                </Alert>
            </Snackbar>
        </LayoutContainer>
    );
}
