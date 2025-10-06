import {useEffect, useState} from "react";
import {Box, Checkbox, ListItemText, MenuItem, Select, Typography,} from "@mui/material";
import {Line} from "react-chartjs-2";
import {CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip,} from "chart.js";
import LayoutContainer from "../common/LayoutContainer.tsx";
import config from "../../config.ts";
import {userIdSignal} from "../store/sessionSignal.ts";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function MultiClubComparisonPage() {
    const [analytics, setAnalytics] = useState<any[]>([]);
    const [selectedClubs, setSelectedClubs] = useState<string[]>([]);

    // Fetch once on mount
    useEffect(() => {
        async function fetchAnalytics() {
            try {
                const response = await fetch(`${config.apiBaseUrl}/clubs/analytic/${userIdSignal.value}`);
                if (response.ok) {
                    const data = await response.json();
                    setAnalytics(data);
                    // default: pick first 2 clubs if available
                    setSelectedClubs(data.slice(0, 2).map((c: any) => c.clubName));
                }
            } catch (err) {
                alert("Failed to fetch analytics for multi-club comparison");
            }
        }

        fetchAnalytics();
    }, []);

    // Build datasets for chart
    const datasets =
        analytics
            .filter((club) => selectedClubs.includes(club.clubName))
            .map((club, idx) => {
                // pick a color per club (fallback: cycle a palette)
                const colors = [
                    "rgba(0,200,180,1)",
                    "rgba(255,165,0,1)",
                    "rgba(138,43,226,1)",
                    "rgba(255,99,132,1)",
                    "rgba(99,132,255,1)",
                ];
                const color = colors[idx % colors.length];

                // ✅ Reverse the order of data points (chronological left → right)
                const reversedData = [...club.attendanceLast12Months].reverse();

                return {
                    label: club.clubName,
                    data: reversedData.map((m: any) => m.value),
                    borderColor: color,
                    backgroundColor: color.replace("1)", "0.2)"),
                    pointBackgroundColor: color,
                    pointBorderColor: "#fff",
                    tension: 0.4,
                };
            });

    // ✅ Reverse labels to match dataset order (chronological)
    const labels =
        analytics[0]?.attendanceLast12Months
            ? [...analytics[0].attendanceLast12Months].reverse().map((m: any) => m.month)
            : [];

    const data = {labels, datasets};

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
            legend: {position: "top" as const, labels: {color: "white"}},
            tooltip: {
                backgroundColor: "rgba(30,30,40,0.9)",
                titleColor: "#fff",
                bodyColor: "#fff",
                borderColor: "rgba(99,132,255,0.6)",
                borderWidth: 1,
            },
        },
    };

    const handleChange = (event: any) => {
        const value = event.target.value as string[];
        if (value.length <= 2) setSelectedClubs(value);
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
                {/* Header + Dropdown */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3,
                    }}
                >
                    <Typography variant="h5" fontWeight="bold" align="left">
                        Multi-Club Comparison View
                    </Typography>
                    <Select
                        multiple
                        value={selectedClubs}
                        onChange={handleChange}
                        renderValue={(selected) => (selected as string[]).join(", ")}
                        sx={{
                            minWidth: 250,
                            bgcolor: "rgba(255,255,255,0.08)",
                            color: "white",
                            borderRadius: 2,
                            ".MuiSvgIcon-root": {color: "white"},
                        }}
                    >
                        {analytics.map((club) => (
                            <MenuItem key={club.clubId} value={club.clubName}>
                                <Checkbox
                                    checked={selectedClubs.indexOf(club.clubName) > -1}
                                    sx={{color: "white"}}
                                />
                                <ListItemText primary={club.clubName}/>
                            </MenuItem>
                        ))}
                    </Select>
                </Box>

                {/* KPI Cards for selected clubs */}
                <Box
                    sx={{
                        display: "flex",
                        gap: 3,
                        mb: 4,
                        flexWrap: "wrap",
                    }}
                >
                    {analytics
                        .filter((club) => selectedClubs.includes(club.clubName))
                        .map((club) => {
                            return (
                                <Box
                                    key={club.clubId}
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
                                        {club.clubName}
                                    </Typography>
                                    <Typography variant="body2" mt={1} color="white">
                                        {club.attendanceThisMonth} attended this month
                                    </Typography>
                                </Box>
                            );
                        })}
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
