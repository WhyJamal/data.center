export interface IEnergyDevice {
    "device_id": string,
    "used_kwh": number
}

export interface IEnergy {
    "success": true,
    "devices": IEnergyDevice[],
    "total_used_kwh": number,
    "total_sum": number,

    "yesterday_used": number,
    "yesterday_sum": number,
    "monthly_used": number,
    "monthly_sum": number,
    "yearly_used": number,
    "yearly_sum": number,
}
