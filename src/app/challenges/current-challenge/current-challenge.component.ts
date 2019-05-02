import { Component, ViewContainerRef, OnInit, OnDestroy } from "@angular/core";
import { ModalDialogService } from "nativescript-angular/modal-dialog";

import { DayModalComponent } from "../day-modal/day-modal.component";
import { UIService } from "~/app/shared/services/ui.service";
import { ChallengeService } from "../../shared/services/challenge.service";
import { Challenge } from "../shared/models/challenge.model";
import { Subscription } from "rxjs";
import { IDay, DayStatus } from "../shared/models/day.model";
import { ChallengeAction } from "../shared/enums/challenge-actions.enum";

@Component({
    selector: "ns-current-challenge",
    templateUrl: "./current-challenge.component.html",
    styleUrls: [
        "./_current-challenge.component.common.scss",
        "./current-challenge.component.scss"
    ],
    moduleId: module.id
})
export class CurrentChallengeComponent implements OnInit, OnDestroy {
    weekDays = ["S", "M", "T", "W", "T", "F", "S"];
    currentChallenge: Challenge;
    dayStatus = DayStatus;

    private curChallengeSub: Subscription;

    constructor(
        private _modalDialog: ModalDialogService,
        private _uiService: UIService,
        private _vcRef: ViewContainerRef,
        private _challengeService: ChallengeService
    ) {}

    ngOnInit() {
        this.curChallengeSub = this._challengeService.currentChallenge.subscribe(
            challenge => {
                this.currentChallenge = challenge;
            }
        );
    }

    ngOnDestroy() {
        this.curChallengeSub.unsubscribe();
    }

    getRow(index: number, day: { dayInMonth: number; dayInWeek: number }) {
        const startRow = 1;
        const weekRow = Math.floor(index / 7);
        const firstWeekDayOfTheMonth = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
        ).getDay();
        const irregularRow = day.dayInWeek < firstWeekDayOfTheMonth ? 1 : 0;
        return startRow + weekRow + irregularRow;
    }

    onChangeStatus(day: IDay) {
        if (!this.getIsDaySettable(day.dayInMonth)) {
            return;
        }
        this._modalDialog
            .showModal(DayModalComponent, {
                fullscreen: true,
                viewContainerRef: this._uiService.getRootVCRef()
                    ? this._uiService.getRootVCRef()
                    : this._vcRef,
                context: { date: day.date, status: day.status }
            })
            .then((action: ChallengeAction) => {
                if (action === ChallengeAction.RESET) {
                    return;
                }
                this._challengeService.updateDayStatus(
                    day.dayInMonth,
                    this._challengeService.getStatusByActionName(action)
                );
            });
    }

    getIsDaySettable(dayInMonth: number) {
        return dayInMonth <= new Date().getDate();
    }
}
