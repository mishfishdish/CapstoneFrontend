import {Box, Button, CircularProgress, LinearProgress, MenuItem, Select, Typography} from "@mui/material";
import {CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip,} from "chart.js";
import {Line} from "react-chartjs-2";
import LayoutContainer from "../common/LayoutContainer.tsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {COMPARISON_ANALYTICS} from "../PathConstants.tsx";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function AnalyticsPage() {
    const attendance = 72;
    const taskCompletion = 86;

    // Dropdown state
    const [selectedClub, setSelectedClub] = useState("Monash Dancing Club");
    const navigate = useNavigate();


    const clubs = ["Monash Dancing Club", "Monash Poetry Club", "Monash Music Club"];

    // Chart Data
    const data = {
        labels: [
            "Week 1",
            "Week 2",
            "Week 3",
            "Week 4",
            "Week 5",
            "Week 6",
            "Week 7",
            "Week 8",
        ],
        datasets: [
            {
                label: `${selectedClub} Attendance %`,
                data: [18, 65, 60, 82, 20, 45, 78, 72],
                borderColor: "rgba(99, 132, 255, 1)",       // Blue line
                backgroundColor: "rgba(99, 132, 255, 0.2)", // Blue fill for points
                pointBackgroundColor: "rgba(99, 132, 255, 1)",
                pointBorderColor: "#fff",
                tension: 0.4,
            },
        ],
    };

    // Chart Options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                min: 0,
                max: 100,
                ticks: {color: "white"},
                grid: {color: "rgba(255,255,255,0.1)"},
            },
            x: {
                ticks: {color: "white"},
                grid: {color: "rgba(255,255,255,0.1)"},
            },
        },
        plugins: {
            legend: {display: false},
            tooltip: {
                backgroundColor: "rgba(30,30,40,0.9)",
                titleColor: "#fff",
                bodyColor: "#fff",
                borderColor: "rgba(99,132,255,0.6)",
                borderWidth: 1,
            },
        },
    };

    return (
        <LayoutContainer>
            <Box
                sx={{
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                    ml: {xs: 0, md: "240px"},
                    px: {xs: 2, md: 4},
                    py: {xs: 4, md: 6},
                    flexGrow: 1,
                }}
            >
                {/* Header Row */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3,
                    }}
                >
                    <Typography variant="h5" fontWeight="bold" align="left">
                        Analytics
                    </Typography>

                    <Box sx={{display: "flex", gap: 2, alignItems: "center"}}>
                        {/* Dropdown */}
                        <Select
                            value={selectedClub}
                            onChange={(e) => setSelectedClub(e.target.value)}
                            sx={{
                                minWidth: 200,
                                bgcolor: "rgba(255,255,255,0.08)",
                                color: "white",
                                borderRadius: 2,
                                ".MuiSvgIcon-root": {color: "white"},
                            }}
                        >
                            {clubs.map((club) => (
                                <MenuItem key={club} value={club}>
                                    {club}
                                </MenuItem>
                            ))}
                        </Select>

                        {/* Button */}
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: "rgba(99,132,255,1)",
                                textTransform: "none",
                                borderRadius: 2,
                                "&:hover": {bgcolor: "rgba(99,132,255,0.85)"},
                            }}
                            onClick={() => {
                                navigate(COMPARISON_ANALYTICS)
                            }}
                        >
                            Multi-Comparison View
                        </Button>
                    </Box>
                </Box>

                {/* KPI Cards */}
                <Box
                    sx={{
                        display: "flex",
                        gap: 3,
                        mb: 4,
                        flexWrap: "wrap",
                    }}
                >
                    {/* Attendance Card */}
                    <Box
                        sx={{
                            flex: "1 1 250px",
                            bgcolor: "rgba(255,255,255,0.06)",
                            borderRadius: 4,
                            p: 3,
                            backdropFilter: "blur(12px)",
                            boxShadow: "0 0 20px rgba(0,0,0,0.2)",
                        }}
                    >
                        <Typography variant="subtitle2" color="white">
                            AVG ATTENDANCE
                        </Typography>
                        <Typography variant="h4" fontWeight="bold" mt={1} color="white">
                            {attendance}%
                        </Typography>
                        <Typography variant="body2" mt={1} color="white">
                            55 This Week
                        </Typography>
                        <Box
                            sx={{
                                position: "relative",
                                display: "inline-flex",
                                mt: 2,
                            }}
                        >
                            <CircularProgress
                                variant="determinate"
                                value={attendance}
                                size={80}
                                thickness={5}
                                sx={{color: "rgba(99,132,255,1)"}}
                            />
                            <Box
                                sx={{
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    position: "absolute",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Typography color="white">{attendance}%</Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Task Completion Card */}
                    <Box
                        sx={{
                            flex: "1 1 250px",
                            bgcolor: "rgba(255,255,255,0.06)",
                            borderRadius: 4,
                            p: 3,
                            backdropFilter: "blur(12px)",
                            boxShadow: "0 0 20px rgba(0,0,0,0.2)",
                        }}
                    >
                        <Typography variant="subtitle2" color="white">
                            TASK COMPLETION
                        </Typography>
                        <Typography variant="h4" fontWeight="bold" mt={1} color="white">
                            {taskCompletion}%
                        </Typography>
                        <Typography variant="body2" mt={1} color="white">
                            DANCE PRACTICE JULY
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            value={75}
                            sx={{
                                mt: 2,
                                height: 10,
                                borderRadius: 5,
                                bgcolor: "rgba(255,255,255,0.1)",
                                "& .MuiLinearProgress-bar": {
                                    backgroundColor: "rgba(99,132,255,1)",
                                },
                            }}
                        />
                        <Typography variant="caption" mt={1} display="block" color="white">
                            Task Completion for all events
                        </Typography>
                    </Box>
                </Box>

                {/* Chart */}
                <Box
                    sx={{
                        bgcolor: "rgba(255,255,255,0.06)",
                        borderRadius: 4,
                        p: 3,
                        height: 350,
                        backdropFilter: "blur(12px)",
                        boxShadow: "0 0 20px rgba(0,0,0,0.2)",
                    }}
                >
                    <Line data={data} options={options}/>
                </Box>
            </Box>
        </LayoutContainer>
    );
}
