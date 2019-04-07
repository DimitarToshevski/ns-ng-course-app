import { Component, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';

import { DayModalComponent } from '../day-modal/day-modal.component';
import { UIService } from '~/app/shared/ui/ui.service';

@Component({
    selector: 'ns-current-challenge',
    templateUrl: './current-challenge.component.html',
    styleUrls: ['./current-challenge.component.css'],
    moduleId: module.id
})
export class CurrentChallengeComponent {

    constructor(private _modalDialog: ModalDialogService, private _uiService: UIService, private _vcRef: ViewContainerRef) { }

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
