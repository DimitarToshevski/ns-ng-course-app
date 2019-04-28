import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ChallengeEditComponent } from './challenge-edit.component';
import { SharedModule } from '~/app/shared/shared.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { ChallengeEditRoutingModule } from './challenge-edit-routing.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

@NgModule({
    declarations: [ChallengeEditComponent],
    imports: [NativeScriptCommonModule, SharedModule, ChallengeEditRoutingModule, NativeScriptFormsModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ChallengeEditModule {}
