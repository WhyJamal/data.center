export interface Section {
    name: string;
    status: string;
    color: string;
    position: { x: number; z: number };
    efficiency: number;
    uptime: number;
    model?: string;
    interiorModel?: string;
    cameras?: string[],
    insideFactory?: string
}