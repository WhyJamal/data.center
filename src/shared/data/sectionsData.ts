import { Section } from "@/shared/types";

const primaryBlue = "#3b82f6";

export const sections: Section[] = [
    {
        name: "PLM system",
        status: "active",
        color: primaryBlue,
        position: { x: -20, z: -10 },
        efficiency: 94,
        uptime: 98,
        model: "/models/factory2.glb",
        cameras: [
            "/videos/13820828_3840_2160_30fps.mp4",
            "/videos/12863424_3840_2160_24fps.mp4",
        ],
        insideFactory: "/models/inside.factory3.glb"
    },
    {
        name: "Smart equipment",
        status: "active",
        color: primaryBlue,
        position: { x: -6, z: -10 },
        efficiency: 89,
        uptime: 95,
        model: "/models/factory4.glb",
        cameras: [
            "/videos/852388-hd_1920_1080_24fps.mp4"
        ],
        insideFactory: "/models/inside.factory3.glb"
    },
    {
        name: "Equipment Introduction",
        status: "active",
        color: primaryBlue,
        position: { x: 8, z: -10 },
        efficiency: 92,
        uptime: 97,
        model: "/models/factory.glb",
        cameras: [
            "/videos/13820828_3840_2160_30fps.mp4",
            "/videos/852388-hd_1920_1080_24fps.mp4"
        ],
    },
    {
        name: "Lean production Platform",
        status: "active",
        color: primaryBlue,
        position: { x: -20, z: 10 },
        efficiency: 96,
        uptime: 99,
        model: "/models/factory1.glb",
        cameras: [],
    },
    {
        name: "Smart Park",
        status: "active",
        color: primaryBlue,
        position: { x: -6, z: 10 },
        efficiency: 88,
        uptime: 93,
        model: "/models/factory1.glb",
        cameras: [],
    },
    {
        name: "Lean visualization",
        status: "active",
        color: primaryBlue,
        position: { x: 8, z: 10 },
        efficiency: 91,
        uptime: 96,
        model: "/models/factory1.glb",
        cameras: [],
    },
];
