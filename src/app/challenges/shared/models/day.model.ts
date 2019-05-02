export enum DayStatus {
    OPEN = "OPEN",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED"
}

export interface IDay {
    dayInMonth: number;
    dayInWeek: number;
    date: Date;
    status: DayStatus;
}
