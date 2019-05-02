import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { Page } from "tns-core-modules/ui/page/page";
import { ChallengeService } from "../../shared/services/challenge.service";

@Component({
    selector: "ns-challenge-tabs",
    templateUrl: "./challenge-tabs.component.html",
    styleUrls: ["./challenge-tabs.component.css"],
    moduleId: module.id
})
export class ChallengeTabsComponent implements OnInit {
    isLoading = false;
    constructor(
        private router: RouterExtensions,
        private route: ActivatedRoute,
        private page: Page,
        private _challengeService: ChallengeService
    ) {}

    ngOnInit() {
        this.isLoading = true;
        this._challengeService.fetchCurrentChallenge().subscribe(
            challenge => {
                this.isLoading = false;
                this._loadTabRoutes();
            },
            err => {
                this.isLoading = false;
                this._loadTabRoutes();
            }
        );

        this.page.actionBarHidden = true;
    }

    private _loadTabRoutes() {
        setTimeout(() => {
            this.router.navigate(
                [
                    {
                        outlets: {
                            currentChallenge: ["current-challenge"],
                            today: ["today"]
                        }
                    }
                ],
                {
                    relativeTo: this.route
                }
            );
        }, 0);
    }
}
