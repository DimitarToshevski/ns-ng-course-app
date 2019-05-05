import { Component, OnInit, OnDestroy } from "@angular/core";
import { ChallengeAction } from "../shared/enums/challenge-actions.enum";
import { ChallengeService } from "../../shared/services/challenge.service";
import { IDay } from "../shared/models/day.model";
import { Subscription } from "rxjs";

@Component({
    selector: "ns-today",
    templateUrl: "./today.component.html",
    styleUrls: ["./today.component.scss"],
    moduleId: module.id
})
export class TodayComponent implements OnInit, OnDestroy {
    currentDay: IDay;

    private _currChallengeSub: Subscription;
    constructor(private _challengeService: ChallengeService) {}

    ngOnInit() {
        this._currChallengeSub = this._challengeService.currentChallenge.subscribe(
            challenge => {
                if (challenge) {
                    this.currentDay = challenge.currentDay;
                }
            }
        );
    }

    ngOnDestroy() {
        this._currChallengeSub.unsubscribe;
    }

    onActionSelected(action: ChallengeAction) {
        this._challengeService.updateDayStatus(
            this.currentDay.dayInMonth,
            this._challengeService.getStatusByActionName(action)
        );
    }

    getActionName() {
        return this._challengeService.getActionNameByStatus(
            this.currentDay.status
        );
    }
}
