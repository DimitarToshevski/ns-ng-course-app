import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { ChallengeAction } from '../shared/enums/challenge-actions.enum';

@Component({
  selector: 'ns-day-modal',
  templateUrl: './day-modal.component.html',
  styleUrls: ['./day-modal.component.css'],
  moduleId: module.id,
})
export class DayModalComponent implements OnInit {
    loadedDate: Date;

  constructor(private _modalParams: ModalDialogParams) { }

  ngOnInit() {
      this.loadedDate = (this._modalParams.context as { date: Date }).date
  }
  onHandleInput(action: ChallengeAction) {
      this._modalParams.closeCallback(action);
  }


}
