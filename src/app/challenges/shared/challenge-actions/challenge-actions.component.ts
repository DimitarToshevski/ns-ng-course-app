import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ChallengeAction } from '../enums/challenge-actions.enum';

@Component({
  selector: 'ns-challenge-actions',
  templateUrl: './challenge-actions.component.html',
  styleUrls: ['./challenge-actions.component.scss'],
  moduleId: module.id,
})
export class ChallengeActionsComponent {
  @Input() cancelText = 'Cancel';
  @Output() actionSelect = new EventEmitter<ChallengeAction>();

  challengeAction = ChallengeAction;

  onAction(action: ChallengeAction) {
    this.actionSelect.emit(action);
  }

}
