export enum DayStatus {
    OPEN,
    COMPLETED,
    FAILED
}

export interface IDay {
    dayInMonth: number;
    dayInWeek: number;
    date: Date;
    status: DayStatus;
}
