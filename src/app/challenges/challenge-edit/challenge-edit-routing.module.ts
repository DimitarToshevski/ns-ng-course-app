import { NgModule, Component } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';
import { ChallengeEditComponent } from './challenge-edit.component';

const routes: Routes = [
   { path: '', component: ChallengeEditComponent}
]
@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule],
})
export class ChallengeEditRoutingModule {}
