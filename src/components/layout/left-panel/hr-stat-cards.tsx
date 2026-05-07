import type { THRStatItem } from "@/types/hr.types";

type HRStatCardsProps = {
    data: THRStatItem[];
};

export function HRStatCards({ data = [] }: HRStatCardsProps) {
    return (
        <div className="flex w-full gap-2 items-stretch">
            {data.map((item, index) => (
                <div
                    key={index}
                    className="flex-1 min-w-0 min-h-25 rounded border border-blue-500/20 p-2 flex flex-col justify-between bg-slate-800/50"
                >
                    <p className="text-sm text-slate-400">{item.label}</p>
                    <h2 className="text-2xl font-bold text-white mt-2">
                        {item.value}
                    </h2>
                </div>
            ))}
        </div>
    );
}