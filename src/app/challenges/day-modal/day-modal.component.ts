import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { ChallengeAction } from "../shared/enums/challenge-actions.enum";
import { DayStatus } from "../shared/models/day.model";
import { ChallengeService } from "../../shared/services/challenge.service";

@Component({
    selector: "ns-day-modal",
    templateUrl: "./day-modal.component.html",
    styleUrls: ["./day-modal.component.css"],
    moduleId: module.id
})
export class DayModalComponent implements OnInit {
    loadedDate: Date;
    chosenAction: ChallengeAction;

    constructor(
        private _modalParams: ModalDialogParams,
        private _challengeService: ChallengeService
    ) {}

    ngOnInit() {
        this.loadedDate = this._modalParams.context.date;
        this.chosenAction = this._challengeService.getActionNameByStatus(
            this._modalParams.context.status
        );
    }
    onHandleInput(action: ChallengeAction) {
        this._modalParams.closeCallback(action);
    }
}
