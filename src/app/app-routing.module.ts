import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AuthGuard } from "./shared/guards/auth.guard";

const routes: Routes = [
    { path: "auth", loadChildren: "~/app/auth/auth.module#AuthModule" },
    {
        path: "challenges",
        loadChildren: "~/app/challenges/challenges.module#ChallengesModule",
        canLoad: [AuthGuard]
    },
    // This is an Angular "issue"
    // canLoad actually blocks the '' path in challenges routing so a direct navigation is required
    { path: "", redirectTo: "/challenges/tabs", pathMatch: "full" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}
