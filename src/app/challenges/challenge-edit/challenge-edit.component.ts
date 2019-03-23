import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ns-challenge-edit',
    templateUrl: './challenge-edit.component.html',
    styleUrls: ['./challenge-edit.component.css'],
    moduleId: module.id
})
export class ChallengeEditComponent {
    @Output() onEdit = new EventEmitter<string>();
    challengeDescription = '';

    onSetChallenge() {
        this.onEdit.emit(this.challengeDescription)
        this.challengeDescription = ''
     }
}
