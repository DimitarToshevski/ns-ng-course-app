import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

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
  onHandleInput(action: string) {
      this._modalParams.closeCallback(action);
  }


}
