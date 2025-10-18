import {Box, Button, MenuItem, Select, Typography} from "@mui/material";
import {CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip,} from "chart.js";
import {Line} from "react-chartjs-2";
import LayoutContainer from "../common/LayoutContainer.tsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {COMPARISON_ANALYTICS} from "../PathConstants.tsx";
import {People} from "@mui/icons-material";
import config from "../../config.ts";
import {clubIdSignal, userIdSignal} from "../store/sessionSignal.ts";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function AnalyticsPage() {
    const [analytics, setAnalytics] = useState<any[]>([]);
    const [clubOptions, setClubOptions] = useState<{ clubId: string; clubName: string }[]>([]);
    const [selectedClub, setSelectedClub] = useState<string>("");

    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const newClubId = event.target.value as string;
        setSelectedClub(newClubId);
        clubIdSignal.value = newClubId;
    };

    useEffect(() => {
        async function fetchAnalytics() {
            try {
                const response = await fetch(`${config.apiBaseUrl}/clubs/analytic/${userIdSignal.value}`);
                if (response.ok) {
                    const data = await response.json();
                    setAnalytics(data);
                    setClubOptions(
                        data.map((object: any) => ({
                            clubId: object.clubId,
                            clubName: object.clubName,
                        }))
                    );
                    if (data.length > 0) {
                        setSelectedClub(data[0].clubId);
                        clubIdSignal.value = data[0].clubId;
                    }
                } else {
                    alert("Failed to fetch analytics");
                }
            } catch (err) {
                alert("Failed to fetch analytics");
            }
        }

        fetchAnalytics();
    }, []);

    // Find data for selected club
    const selectedClubData = analytics.find((club) => club.clubId === selectedClub);

    const attendance = selectedClubData?.attendanceThisMonth ?? 0;
    const tasks = selectedClubData?.tasks ?? {completed: 0, overdue: 0, ongoing: 0};
    const totalTasks = tasks.completed + tasks.overdue + tasks.ongoing;

    // ✅ Reverse order for chronological (oldest → newest)
    const reversedData =
        selectedClubData?.attendanceLast12Months
            ? [...selectedClubData.attendanceLast12Months].reverse()
            : [];

    // Chart data for last 12 months (chronological)
    const data = {
        labels: reversedData.map((m: any) => m.month),
        datasets: [
            {
                label: `${selectedClubData?.clubName ?? ""} Attendance`,
                data: reversedData.map((m: any) => m.value),
                borderColor: "rgba(99, 132, 255, 1)",
                backgroundColor: "rgba(99, 132, 255, 0.2)",
                pointBackgroundColor: "rgba(99, 132, 255, 1)",
                pointBorderColor: "#fff",
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                min: 0,
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
        },
    };

    // Attendance people figures
    const figureValue = 10;
    const fullFigures = Math.floor(attendance / figureValue);
    const remainder = attendance % figureValue;

    // Task breakdown as percentages
    const completedPct = totalTasks > 0 ? (tasks.completed / totalTasks) * 100 : 0;
    const overduePct = totalTasks > 0 ? (tasks.overdue / totalTasks) * 100 : 0;
    const ongoingPct = totalTasks > 0 ? (tasks.ongoing / totalTasks) * 100 : 0;

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
                            onChange={handleChange as any}
                            sx={{
                                minWidth: 250,
                                bgcolor: "rgba(255,255,255,0.08)",
                                color: "white",
                                borderRadius: 2,
                                ".MuiSvgIcon-root": {color: "white"},
                            }}
                        >
                            {clubOptions.map((club) => (
                                <MenuItem key={club.clubId} value={club.clubId}>
                                    {club.clubName}
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
                            onClick={() => navigate(COMPARISON_ANALYTICS)}
                        >
                            Multi-Comparison View
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: "rgba(99,132,255,1)",
                                textTransform: "none",
                                borderRadius: 2,
                                "&:hover": {bgcolor: "rgba(99,132,255,0.85)"},
                            }}
                            onClick={() => {
                                navigate('/TEST')
                            }}
                        >
                            Attendance Reports
                        </Button>
                    </Box>
                </Box>

                {/* KPI Cards */}
                <Box sx={{display: "flex", gap: 3, mb: 4, flexWrap: "wrap"}}>
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
                            ATTENDANCE
                        </Typography>
                        <Typography variant="body2" mt={1} color="white">
                            {attendance} This Month
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "center",
                                mt: 2,
                                gap: 1.5,
                                maxWidth: 200,
                                mx: "auto",
                            }}
                        >
                            {[...Array(fullFigures)].map((_, i) => (
                                <People key={i} sx={{color: "#4cafef", fontSize: 36}}/>
                            ))}

                            {remainder > 0 && (
                                <People sx={{color: "rgba(76, 175, 239, 0.5)", fontSize: 36}}/>
                            )}
                        </Box>
                    </Box>

                    {/* Task Breakdown Card */}
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
                            TASKS
                        </Typography>

                        {/* Stacked bar */}
                        <Box sx={{mt: 2}}>
                            <Box
                                sx={{
                                    display: "flex",
                                    height: 14,
                                    borderRadius: 7,
                                    overflow: "hidden",
                                }}
                            >
                                <Box sx={{width: `${completedPct}%`, bgcolor: "#4caf50"}}/>
                                <Box sx={{width: `${ongoingPct}%`, bgcolor: "#ff9800"}}/>
                                <Box sx={{width: `${overduePct}%`, bgcolor: "#f44336"}}/>
                            </Box>

                            {/* Legend */}
                            <Box sx={{display: "flex", justifyContent: "space-between", mt: 1}}>
                                <Typography variant="caption" color="white">
                                    ✅ Completed: {tasks.completed}
                                </Typography>
                                <Typography variant="caption" color="white">
                                    ⏳ Ongoing: {tasks.ongoing}
                                </Typography>
                                <Typography variant="caption" color="white">
                                    ⚠️ Overdue: {tasks.overdue}
                                </Typography>
                            </Box>
                        </Box>
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
