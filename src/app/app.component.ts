import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    AfterViewInit,
    ChangeDetectorRef,
    ViewContainerRef
} from "@angular/core";
import { Subscription } from "rxjs";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";

import { UIService } from "./shared/services/ui.service";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild(RadSideDrawerComponent) drawerComponent: RadSideDrawerComponent;

    activeChallenge = "";

    private _drawerSubscription: Subscription;
    private _drawer: RadSideDrawer;

    constructor(
        private _uiService: UIService,
        private _cdr: ChangeDetectorRef,
        private _vcRef: ViewContainerRef
    ) {}

    ngOnInit() {
        this._drawerSubscription = this._uiService.drawerSTate.subscribe(() => {
            if (this._drawer) {
                this._drawer.toggleDrawerState();
            }
        });
        this._uiService.setRootVCRef(this._vcRef);
    }

    ngAfterViewInit() {
        this._drawer = this.drawerComponent.sideDrawer;
        this._cdr.detectChanges();
    }

    onChallengeInput(challengeDescription: string) {
        this.activeChallenge = challengeDescription;
    }

    onLogout() {
        this._uiService.toggleDrawer();
    }

    ngOnDestroy() {
        this._drawerSubscription.unsubscribe();
    }
}
