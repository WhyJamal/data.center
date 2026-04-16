
import {
    Card,
    CardContent,
    Typography,
    Box,
    LinearProgress,
    Chip,
    Stack,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

type Status = "active" | "warning" | "maintenance";

const statusItems: {
    name: string;
    status: Status;
    value: number;
}[] = [
        { name: "Line A", status: "active", value: 85 },
        { name: "Line B", status: "active", value: 92 },
        { name: "Line C", status: "warning", value: 68 },
        { name: "Line D", status: "active", value: 88 },
        { name: "Line E", status: "maintenance", value: 0 },
    ];

const getColor = (status: Status) => {
    switch (status) {
        case "active":
            return "success";
        case "warning":
            return "warning";
        case "maintenance":
            return "error";
    }
}

const getLabel = (status: string) => {
    switch (status) {
        case "active":
            return "Active";
        case "warning":
            return "Warning";
        case "maintenance":
            return "Maintenance";
        default:
            return status;
    }
};

export default function ProductionLines() {
    return (
        <Card
            sx={{
                backgroundColor: "rgba(30, 41, 59, 0.5)", // slate-800/50
                borderRadius: "0.5rem", // rounded-lg
                padding: "1rem", // p-4
                marginBottom: "1.5rem", // mb-6
                border: "1px solid rgba(59, 130, 246, 0.2)" // border-blue-500/20
            }}
        >
            <CardContent>
                <Typography
                    variant="h6"
                    sx={{
                        mb: 3,
                        fontWeight: "bold",
                        background: "linear-gradient(to right, #38bdf8, #22d3ee)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    Production Lines
                </Typography>

                <Stack spacing={2}>
                    {statusItems.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                p: 1.5,
                                borderRadius: 2,
                                transition: "0.3s",
                                color: '#fff',
                                "&:hover": {
                                    backgroundColor: "rgba(255,255,255,0.05)",
                                },
                            }}
                        >
                            {/* Top Row */}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mb: 1,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                    }}
                                >
                                    <CircleIcon
                                        fontSize="small"
                                        color={getColor(item.status)}
                                    />
                                    <Typography variant="body2">{item.name}</Typography>
                                </Box>

                                <Chip
                                    label={getLabel(item.status)}
                                    color={getColor(item.status)}
                                    size="small"
                                    variant="outlined"
                                />
                            </Box>

                            {/* Progress */}
                            <LinearProgress
                                variant="determinate"
                                value={item.value}
                                color={getColor(item.status)}
                                sx={{
                                    height: 8,
                                    borderRadius: 5,
                                    backgroundColor: "rgba(255,255,255,0.1)",
                                }}
                            />

                            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                                <Typography variant="caption" color="gray">
                                    Efficiency
                                </Typography>
                                <Typography variant="caption">
                                    {item.value}%
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
}