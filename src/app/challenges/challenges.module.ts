import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { ChallengesRoutingModule } from "./challenges-routing.module";
import { ChallengeTabsComponent } from "./challenge-tabs/challenge-tabs.component";
import { CurrentChallengeComponent } from "./current-challenge/current-challenge.component";
import { TodayComponent } from "./today/today.component";
import { SharedModule } from "../shared/shared.module";
import { ChallengeActionsModule } from "./shared/challenge-actions/challenge-actions.module";
import { NoChallengeComponent } from "./shared/no-challenge/no-challenge.component";

@NgModule({
    declarations: [
        ChallengeTabsComponent,
        CurrentChallengeComponent,
        TodayComponent,
        NoChallengeComponent
    ],
    imports: [
        NativeScriptCommonModule,
        ChallengesRoutingModule,
        SharedModule,
        ChallengeActionsModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ChallengesModule {}
