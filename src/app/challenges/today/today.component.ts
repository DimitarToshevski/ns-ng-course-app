import { Component, OnInit } from '@angular/core';
import { ChallengeAction } from '../shared/enums/challenge-actions.enum';

@Component({
  selector: 'ns-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
  moduleId: module.id,
})
export class TodayComponent {
  onActionSelected(action: ChallengeAction) {
    console.log(action);
    
  }
}
