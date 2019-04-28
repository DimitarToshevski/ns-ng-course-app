import { IDay, DayStatus } from "./day.model";

export class Challenge {
    constructor(
        public title: string,
        public description: string,
        public year: number,
        public month: number,
        private _days: Array<IDay> = []
    ) {
        if (_days.length > 0) {
            return;
        }
        // this._currentYear = new Date().getFullYear();
        // this._currentMonth = new Date().getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 1; i < daysInMonth + 1; i++) {
            const date = new Date(year, month, i);
            const dayInWeek = date.getDay();
            this._days.push({
                dayInMonth: i,
                dayInWeek: dayInWeek,
                date: date,
                status: DayStatus.OPEN
            });
        }
    }

    get currentDay() {
        return this._days.find(d => d.dayInMonth === new Date().getDate());
    }

    get days() {
        return [...this._days];
    }
}
