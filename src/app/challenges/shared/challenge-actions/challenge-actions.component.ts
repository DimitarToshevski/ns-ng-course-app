import {
    Component,
    Output,
    EventEmitter,
    Input,
    OnChanges,
    SimpleChanges
} from "@angular/core";
import { ChallengeAction } from "../enums/challenge-actions.enum";
import { ChallengeService } from "../services/challenge.service";

@Component({
    selector: "ns-challenge-actions",
    templateUrl: "./challenge-actions.component.html",
    styleUrls: ["./challenge-actions.component.scss"],
    moduleId: module.id
})
export class ChallengeActionsComponent implements OnChanges {
    @Input() cancelText = "Cancel";
    @Input() chosenAction: ChallengeAction;
    @Output() actionSelect = new EventEmitter<ChallengeAction>();

    challengeAction = ChallengeAction;
    selectedAction: ChallengeAction = null;

    constructor(private _challengeService: ChallengeService) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.chosenAction) {
            this.selectedAction = changes.chosenAction.currentValue;
        }
    }

    onAction(action: ChallengeAction) {
        this.selectedAction = action;
        this.actionSelect.emit(action);
    }
}
