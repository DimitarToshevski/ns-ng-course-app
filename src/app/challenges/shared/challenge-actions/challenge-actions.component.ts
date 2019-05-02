import { Component, Output, EventEmitter, Input } from "@angular/core";
import { ChallengeAction } from "../enums/challenge-actions.enum";
import { DayStatus } from "../models/day.model";

@Component({
    selector: "ns-challenge-actions",
    templateUrl: "./challenge-actions.component.html",
    styleUrls: ["./challenge-actions.component.scss"],
    moduleId: module.id
})
export class ChallengeActionsComponent {
    @Input() cancelText = "Cancel";
    @Output() actionSelect = new EventEmitter<ChallengeAction>();

    challengeAction = ChallengeAction;
    selectedAction: ChallengeAction = null;

    onAction(action: ChallengeAction) {
        this.selectedAction = action;

        let status;
        switch (action) {
            case ChallengeAction.COMPLETE:
                status = DayStatus.COMPLETED;
                break;
            case ChallengeAction.FAIL:
                status = DayStatus.FAILED;
                break;
            default:
                status = DayStatus.OPEN;
                break;
        }
        this.actionSelect.emit(status);
    }
}
