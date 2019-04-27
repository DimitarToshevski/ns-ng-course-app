import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';

import { DayModalComponent } from '../day-modal/day-modal.component';
import { UIService } from '~/app/shared/ui/ui.service';

@Component({
    selector: 'ns-current-challenge',
    templateUrl: './current-challenge.component.html',
    styleUrls: ['./_current-challenge.component.common.scss','./current-challenge.component.scss'],
    moduleId: module.id
})
export class CurrentChallengeComponent implements OnInit {

    weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    days: Array<{ dayInMonth: number, dayInWeek: number }> = [];

    private _currentMonth: number;
    private _currentYear: number;

    constructor(private _modalDialog: ModalDialogService, private _uiService: UIService, private _vcRef: ViewContainerRef) { }

    ngOnInit() {
        this._currentYear = new Date().getFullYear();
        this._currentMonth = new Date().getMonth();
        const daysInMonth = new Date(this._currentYear, this._currentMonth + 1, 0).getDate();
        
        for( let i = 1; i < daysInMonth + 1; i++) {
            const date = new Date(this._currentYear, this._currentMonth, i);
            const dayInWeek = date.getDay();
            this.days.push({ dayInMonth: i, dayInWeek: dayInWeek })
        }
    }

    getRow(index: number, day: { dayInMonth: number, dayInWeek: number }) {
        const startRow = 1;
        const weekRow = Math.floor(index / 7);
        const firstWeekDayOfTheMonth = new Date(this._currentYear, this._currentMonth, 1).getDay();
        const irregularRow = day.dayInWeek < firstWeekDayOfTheMonth ? 1 : 0;
        return startRow + weekRow + irregularRow;
    }

    onChangeStatus() {
        this._modalDialog.showModal(DayModalComponent, {
            fullscreen: true,
            viewContainerRef: this._uiService.getRootVCRef() ? this._uiService.getRootVCRef() : this._vcRef,
            context: { date: new Date() }
        }).then((action: string)=>{
            console.log(action)
        });
    }
}
