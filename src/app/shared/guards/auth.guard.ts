import { CanLoad, Route, UrlSegment } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Observable, of } from "rxjs";
import { take, switchMap, tap } from "rxjs/operators";
import { RouterExtensions } from "nativescript-angular/router";

@Injectable()
export class AuthGuard implements CanLoad {
    constructor(
        private _authService: AuthService,
        private _router: RouterExtensions
    ) {}

    canLoad(
        route: Route,
        segments: UrlSegment[]
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this._authService.user.pipe(
            take(1),
            switchMap(currentUser => {
                // If no current user, try autoLogin,
                // Return the result of autoLogin or true if currentUser
                if (!currentUser || !currentUser.isAuthenticated) {
                    return this._authService.autoLogin();
                }
                return of(true);
            }),
            tap(isAuthenticated => {
                if (!isAuthenticated) {
                    this._router.navigate(["/auth"]);
                }
            })
        );
    }
}
