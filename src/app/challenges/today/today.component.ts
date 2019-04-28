import { Component, OnInit, OnDestroy } from "@angular/core";
import { ChallengeAction } from "../shared/enums/challenge-actions.enum";
import { ChallengeService } from "../shared/services/challenge.service";
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
        if (this._currChallengeSub) {
            this._currChallengeSub.unsubscribe;
        }
    }

    onActionSelected(action: ChallengeAction) {
        console.log(action);
    }
}
