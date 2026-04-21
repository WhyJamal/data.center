import {
    Card, CardContent, Typography, Box,
    LinearProgress, Chip, Stack,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

type Status = "active" | "warning" | "maintenance";

const statusItems: { name: string; status: Status; value: number }[] = [
    { name: "Line A", status: "active", value: 85 },
    { name: "Line B", status: "active", value: 92 },
    { name: "Line C", status: "warning", value: 68 },
    { name: "Line D", status: "active", value: 88 },
    { name: "Line E", status: "maintenance", value: 0 },
];

const getColor = (status: Status) => {
    switch (status) {
        case "active": return "success";
        case "warning": return "warning";
        case "maintenance": return "error";
    }
};

const getLabel = (status: string) => {
    switch (status) {
        case "active": return "Active";
        case "warning": return "Warning";
        case "maintenance": return "Maint.";
        default: return status;
    }
};

export default function ProductionLines() {
    return (
        <Card sx={{
            backgroundColor: "rgba(30, 41, 59, 0.5)",
            borderRadius: "0.5rem",
            marginBottom: "0.5rem",
            border: "1px solid rgba(59, 130, 246, 0.2)",
            boxShadow: "none",
        }}>
            <CardContent sx={{ padding: "8px !important", "&:last-child": { paddingBottom: "8px !important" } }}>
                <Typography sx={{
                    mb: 1,
                    fontWeight: "bold",
                    fontSize: "10px",
                    background: "linear-gradient(to right, #38bdf8, #22d3ee)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}>
                    Production Lines
                </Typography>

                <Stack spacing={0.5}>
                    {statusItems.map((item, index) => (
                        <Box key={index} sx={{
                            px: 1, py: 0.5,
                            borderRadius: 1,
                            transition: "0.3s",
                            color: "#fff",
                            "&:hover": { backgroundColor: "rgba(255,255,255,0.05)" },
                        }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                                    <CircleIcon sx={{ fontSize: "8px" }} color={getColor(item.status)} />
                                    <Typography sx={{ fontSize: "10px" }}>{item.name}</Typography>
                                </Box>
                                <Chip
                                    label={getLabel(item.status)}
                                    color={getColor(item.status)}
                                    size="small"
                                    variant="outlined"
                                    sx={{ fontSize: "8px", height: "16px", "& .MuiChip-label": { px: 0.75 } }}
                                />
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={item.value}
                                color={getColor(item.status)}
                                sx={{ height: 4, borderRadius: 5, backgroundColor: "rgba(255,255,255,0.1)" }}
                            />
                            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.25 }}>
                                <Typography sx={{ fontSize: "8px", color: "gray" }}>Efficiency</Typography>
                                <Typography sx={{ fontSize: "8px" }}>{item.value}%</Typography>
                            </Box>
                        </Box>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
}