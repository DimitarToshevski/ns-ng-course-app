import { Component, OnInit, OnDestroy } from "@angular/core";
import { UIService } from './shared/ui/ui.service';
import { Subscription } from 'rxjs';

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, OnDestroy {
    activeChallenge = '';

    private _drawerSubscription: Subscription;

    constructor(private uiService: UIService) { }

    ngOnInit() {
        this._drawerSubscription = this.uiService.drawerSTate.subscribe(()=>{

        });
    }

    onChallengeInput(challengeDescription: string) {
        this.activeChallenge = challengeDescription;
    }

    ngOnDestroy() {
        this._drawerSubscription.unsubscribe();
    }
}
