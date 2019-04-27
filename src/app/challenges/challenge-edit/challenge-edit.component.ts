import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PageRoute } from 'nativescript-angular/router';

@Component({
    selector: 'ns-challenge-edit',
    templateUrl: './challenge-edit.component.html',
    styleUrls: ['./challenge-edit.component.scss'],
    moduleId: module.id
})
export class ChallengeEditComponent implements OnInit {
    isCreating = true;

    constructor(private _route: ActivatedRoute, private _pageRoute: PageRoute) { }

    ngOnInit() {
        // Pages are cached so if navigating back from another page  to this one, ngOnInit wont trigger again

        // this._route.paramMap.subscribe((params)=>{
        // });

        // Using pageRoute so even if the page has been cached we can get the proper data
        // It returns the activatedRoute every time when the page is active no matter if taken from cache
        // Use this approach unless you know that your page wont come from cache(no page follows this one)
        this._pageRoute.activatedRoute.pipe(
            switchMap((activatedRoute) => {
                return activatedRoute.paramMap
            })
        ).subscribe((params) => {
            if(!params.has('mode')) {
                this.isCreating = true;
            } else {
                this.isCreating = params.get('mode') !== 'edit';
            }
        })
    }
}
