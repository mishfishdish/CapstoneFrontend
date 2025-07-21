import {Box, FormControl, InputLabel, MenuItem, Pagination, Select, TextField, Typography,} from '@mui/material';
import LayoutContainer from '../common/LayoutContainer';
import {useState} from 'react';

export default function DatabaseViewPage() {
    const [sort, setSort] = useState('Date');
    const [selectedClub, setSelectedClub] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);

    const clubOptions = [
        {clubId: 'mac', clubName: 'MAC'},
        {clubId: 'maps', clubName: 'MAPS'},
    ];

    const filteredActivities = [
        {id: 1, title: 'Sponsorship Meeting', datetime: '10 May 2024 2:00 PM'},
        {id: 2, title: 'Complete Sponsorship Draft', datetime: '10 June 2024 10:00 PM'},
        {id: 3, title: 'Internal Club Meeting', datetime: '31 August 2024 10:00 PM'},
        {id: 4, title: 'Monash Coding Event', datetime: '10 September 2024 10:00 PM'},
    ];

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
                        Database view
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 2,
                            mb: 3,
                        }}
                    >
                        <FormControl variant="outlined">
                            <InputLabel id="sort-label" sx={{color: 'white'}}>Sort</InputLabel>
                            <Select
                                labelId="sort-label"
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                label="Sort"
                                sx={{
                                    minWidth: 150,
                                    bgcolor: 'rgba(255,255,255,0.08)',
                                    color: 'white',
                                    borderRadius: 2,
                                    '.MuiSvgIcon-root': {color: 'white'},
                                }}
                            >
                                <MenuItem value="Date">Date</MenuItem>
                                <MenuItem value="Title">Title</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined">
                            <InputLabel id="club-label" sx={{color: 'white'}}>Club</InputLabel>
                            <Select
                                labelId="club-label"
                                value={selectedClub}
                                onChange={(e) => setClub(e.target.value)}
                                label="Club"
                                sx={{
                                    minWidth: 150,
                                    bgcolor: 'rgba(255,255,255,0.08)',
                                    color: 'white',
                                    borderRadius: 2,
                                    '.MuiSvgIcon-root': {color: 'white'},
                                }}
                            >
                                <MenuItem value="All">All</MenuItem>
                                {clubOptions.map((c) => (
                                    <MenuItem key={c.clubId} value={c.clubId}>
                                        {c.clubName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <TextField
                        fullWidth
                        placeholder="Search"
                        variant="outlined"
                        sx={{
                            mb: 3,
                            input: {color: 'white'},
                            bgcolor: 'white',
                            borderRadius: 1,
                        }}
                    />

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            mb: 3,
                        }}
                    >
                        {filteredActivities.map((a) => (
                            <Box
                                key={a.id}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    bgcolor: 'rgba(255,255,255,0.1)',
                                    borderRadius: 2,
                                    p: 2,
                                }}
                            >
                                <Typography fontWeight="bold">{a.title}</Typography>
                                <Typography>{a.date}</Typography>
                            </Box>
                        ))}
                    </Box>

                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Pagination count={10} page={page} sx={{
                            '& .MuiPaginationItem-root': {
                                color: 'white',
                                borderColor: 'white',
                            },
                            '& .Mui-selected': {
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                color: 'white',
                            },
                        }} onChange={() => "hello"}/>
                    </Box>
                </Box>
            </Box>
        </LayoutContainer>
    );
}