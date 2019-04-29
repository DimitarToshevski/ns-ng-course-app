import { NgModule } from "@angular/core";
import { ChallengeActionsComponent } from "./challenge-actions.component";
import { NativeScriptCommonModule } from "nativescript-angular/common";

@NgModule({
    imports: [NativeScriptCommonModule],
    declarations: [ChallengeActionsComponent],
    exports: [ChallengeActionsComponent]
})
export class ChallengeActionsModule {}
