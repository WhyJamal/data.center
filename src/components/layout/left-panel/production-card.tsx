import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import BottleIcon from '@/assets/icons/bottle-icon';
import JarIcon from '@/assets/icons/jar-icon';
import GlassIcon from '@/assets/icons/glass-icon';
import type { WeeklyProductionOutputItem } from '@/types/production.types';

interface ProductionCardProps {
    data: WeeklyProductionOutputItem;
}

export default function ProductionCard({ data = { title: "", type: "bottle", quantity: 0 } }: ProductionCardProps) {
    return (
        <Card
            sx={{
                flex: 1,
                height: "100%",
            }}
        >
            <CardActionArea
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <div className="flex items-center justify-center py-2">
                    {data.type === "bottle" && <BottleIcon />}
                    {data.type === "glass" && <GlassIcon />}
                    {data.type === "jar" && <JarIcon />}
                </div>

                <CardContent sx={{ width: "100%" }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "14px", fontWeight: "bold" }}>
                        {data.title}
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                    >
                        {data.quantity ?? 0}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
