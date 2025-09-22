import {Box, Checkbox, ListItemText, MenuItem, Select, Typography} from "@mui/material";
import {CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip,} from "chart.js";
import {Line} from "react-chartjs-2";
import LayoutContainer from "../common/LayoutContainer.tsx";
import {useState} from "react";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function MultiClubComparisonPage() {
    const allClubs = [
        {name: "Monash Dancing Club", color: "rgba(0, 200, 180, 1)"},
        {name: "Monash Poetry Club", color: "rgba(255, 165, 0, 1)"},
        {name: "Monash Music Club", color: "rgba(138, 43, 226, 1)"},
        {name: "Monash Chess Club", color: "rgba(255, 99, 132, 1)"},
    ];

    const [selectedClubs, setSelectedClubs] = useState<string[]>([
        "Monash Dancing Club",
        "Monash Poetry Club",
    ]);

    // Fake dataset generator
    const generateData = (club: string) => {
        switch (club) {
            case "Monash Dancing Club":
                return [18, 65, 60, 82, 40, 70, 78, 72];
            case "Monash Poetry Club":
                return [25, 55, 50, 68, 35, 65, 55, 60];
            case "Monash Music Club":
                return [30, 45, 70, 60, 50, 75, 65, 80];
            case "Monash Chess Club":
                return [20, 35, 40, 55, 60, 45, 50, 65];
            default:
                return [];
        }
    };

    // Build chart datasets from selected clubs
    const datasets = selectedClubs.map((club) => {
        const clubMeta = allClubs.find((c) => c.name === club)!;
        return {
            label: club,
            data: generateData(club),
            borderColor: clubMeta.color,
            backgroundColor: clubMeta.color.replace("1)", "0.2)"), // semi-transparent fill
            pointBackgroundColor: clubMeta.color,
            pointBorderColor: "#fff",
            tension: 0.4,
        };
    });

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
        datasets,
    };

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
            legend: {
                position: "top" as const,
                labels: {color: "white"},
            },
            tooltip: {
                backgroundColor: "rgba(30,30,40,0.9)",
                titleColor: "#fff",
                bodyColor: "#fff",
                borderColor: "rgba(99,132,255,0.6)",
                borderWidth: 1,
            },
        },
    };

    // Handle dropdown changes (limit 2 selections)
    const handleChange = (event: any) => {
        const value = event.target.value as string[];
        if (value.length <= 2) {
            setSelectedClubs(value);
        }
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
                        {allClubs.map((club) => (
                            <MenuItem key={club.name} value={club.name}>
                                <Checkbox
                                    checked={selectedClubs.indexOf(club.name) > -1}
                                    sx={{color: "white"}}
                                />
                                <ListItemText primary={club.name}/>
                            </MenuItem>
                        ))}
                    </Select>
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
                    {selectedClubs.map((club) => (
                        <Box
                            key={club}
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
                                {club}
                            </Typography>
                            <Typography variant="h4" fontWeight="bold" mt={1} color="white">
                                {Math.round(
                                    generateData(club).reduce((a, b) => a + b, 0) /
                                    generateData(club).length
                                )}
                                %
                            </Typography>
                            <Typography variant="body2" mt={1} color="white">
                                Monthly Average
                            </Typography>
                        </Box>
                    ))}
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
