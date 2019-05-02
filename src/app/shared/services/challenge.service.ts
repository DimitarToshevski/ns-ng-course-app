import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Challenge } from "../../challenges/shared/models/challenge.model";
import { DayStatus } from "../../challenges/shared/models/day.model";
import { take, tap } from "rxjs/operators";
import { ChallengeAction } from "../../challenges/shared/enums/challenge-actions.enum";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class ChallengeService {
    constructor(private _http: HttpClient) {}

    private _currentChallenge = new BehaviorSubject<Challenge>(null);

    get currentChallenge() {
        return this._currentChallenge.asObservable();
    }

    fetchCurrentChallenge() {
        return this._http
            .get<Challenge>(
                "https://nativescript-challenge-app.firebaseio.com/challenge.json"
            )
            .pipe(
                tap(challenge => {
                    console.log(challenge);

                    if (challenge) {
                        const loadedChallenge = new Challenge(
                            challenge.title,
                            challenge.description,
                            challenge.year,
                            challenge.month,
                            challenge.days
                        );
                        this._currentChallenge.next(loadedChallenge);
                    }
                })
            );
    }

    createNewChallenge(title: string, description: string) {
        const newChallenge = new Challenge(
            title,
            description,
            new Date().getFullYear(),
            new Date().getMonth()
        );
        this._saveToServer(newChallenge);
        this._currentChallenge.next(newChallenge);
    }

    updateChallenge(title: string, description: string) {
        this.currentChallenge.pipe(take(1)).subscribe(challenge => {
            const updatedChallenge = new Challenge(
                title,
                description,
                challenge.year,
                challenge.month,
                challenge.days
            );
            this._saveToServer(updatedChallenge);
            this._currentChallenge.next(updatedChallenge);
        });
    }

    updateDayStatus(dayInMonth: number, status: DayStatus) {
        this._currentChallenge.pipe(take(1)).subscribe(challenge => {
            if (!challenge || challenge.days.length < dayInMonth) {
                return;
            }
            const dayIndex = challenge.days.findIndex(
                d => d.dayInMonth === dayInMonth
            );
            challenge.days[dayIndex].status = status;

            this._saveToServer(challenge);
            this._currentChallenge.next(challenge);
        });
    }

    getActionNameByStatus(status: DayStatus) {
        switch (status) {
            case DayStatus.COMPLETED:
                return ChallengeAction.COMPLETE;
            case DayStatus.FAILED:
                return ChallengeAction.FAIL;
            case DayStatus.OPEN:
                return ChallengeAction.RESET;
        }
    }

    getStatusByActionName(action: ChallengeAction) {
        switch (action) {
            case ChallengeAction.COMPLETE:
                return DayStatus.COMPLETED;
            case ChallengeAction.FAIL:
                return DayStatus.FAILED;
            case ChallengeAction.RESET:
                return DayStatus.OPEN;
        }
    }

    private _saveToServer(challenge: Challenge) {
        this._http
            .put(
                "https://nativescript-challenge-app.firebaseio.com/challenge.json",
                challenge
            )
            .subscribe();
    }
}
