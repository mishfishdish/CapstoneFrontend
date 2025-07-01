import {Box, Button, Container, Stack, TextField, Typography, useTheme} from "@mui/material";


export default function LoginPage() {
    const theme = useTheme();

    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(to right, #2c3e50, #4ca1af)',
                px: 2,
            }}
        >
            <Container
                maxWidth="md"
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    bgcolor: 'rgba(255,255,255,0.05)',
                    borderRadius: 4,
                    p: 4,
                    boxShadow: 3,
                }}
            >
                {/* Logo + Heading */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        color: 'white',
                        mb: { xs: 4, md: 0 },
                        width: { xs: '100%', md: '40%' },
                    }}
                >
                    <Box
                        sx={{
                            width: 120,
                            height: 120,
                            backgroundColor: '#00e0ff',
                            borderRadius: 3,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 64,
                            fontWeight: 'bold',
                            color: '#1a1a1a',
                            mb: 2,
                        }}
                    >
                        Σ
                    </Box>
                    <Typography variant="h4" fontWeight="bold">
                        SigmaSchedule
                    </Typography>
                    <Typography variant="subtitle1" color="rgba(255,255,255,0.8)">
                        Simplifying Club Event Management
                    </Typography>
                </Box>

                {/* Login Form */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: { xs: '100%', md: '50%' },
                    }}
                >
                    <TextField
                        label="Username"
                        variant="filled"
                        fullWidth
                        InputProps={{ disableUnderline: true }}
                        sx={{ backgroundColor: 'white', borderRadius: 1 }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="filled"
                        fullWidth
                        InputProps={{ disableUnderline: true }}
                        sx={{ backgroundColor: 'white', borderRadius: 1 }}
                    />
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                textTransform: 'none',
                                bgcolor: 'black',
                            }}
                        >
                            New user
                        </Button>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                textTransform: 'none',
                                bgcolor: 'black',
                            }}
                        >
                            Log in
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
}