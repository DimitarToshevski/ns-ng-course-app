import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";
import { NativeScriptRouterModule } from "nativescript-angular/router";

@NgModule({
    declarations: [AuthComponent],
    imports: [
        CommonModule,
        NativeScriptRouterModule.forChild([
            { path: "", component: AuthComponent }
        ]),
        NativeScriptFormsModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class AuthModule {}
