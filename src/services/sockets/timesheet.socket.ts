import { BaseSocket } from "./base.socket";

export interface TimesheetData {
  total_users: number;
}

export const timesheetSocket = new BaseSocket<TimesheetData>(
  "ws://localhost:8000/ws/timesheet/present-employees"
);