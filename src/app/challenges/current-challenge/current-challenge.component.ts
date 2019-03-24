import { Component, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';

import { DayModalComponent } from '../day-modal/day-modal.component';

@Component({
    selector: 'ns-current-challenge',
    templateUrl: './current-challenge.component.html',
    styleUrls: ['./current-challenge.component.css'],
    moduleId: module.id
})
export class CurrentChallengeComponent {

    constructor(private _modalDialog: ModalDialogService, private _vcRef: ViewContainerRef) { }

    onChangeStatus() {
        this._modalDialog.showModal(DayModalComponent, {
            fullscreen: true,
            viewContainerRef: this._vcRef
        });
    }
}
