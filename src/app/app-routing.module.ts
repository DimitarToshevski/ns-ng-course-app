import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
    { path: '', component: AuthComponent },
    {
        path: 'challenges',
        loadChildren: '~/app/challenges/challenges.module#ChallengesModule'
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
