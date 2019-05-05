import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";
import { throwError, BehaviorSubject, of } from "rxjs";
import { ErrorResponse } from "../enums/error-response.enum";
import { alert } from "tns-core-modules/ui/dialogs";
import { IAuthResponse } from "../interfaces/auth-response.interface";
import { User } from "../models/user.model";
import { RouterExtensions } from "nativescript-angular/router";
import {
    setString,
    getString,
    hasKey,
    remove
} from "tns-core-modules/application-settings";

const FIREBASE_API_KEY = "AIzaSyD7OpMdUhH4w5p1Vro2i99uwoVxcffh1uE";

@Injectable({ providedIn: "root" })
export class AuthService {
    get user() {
        return this._user.asObservable();
    }

    // prop to store the user in memory instead of the local storage
    private _user = new BehaviorSubject<User>(null);
    private _tokenExpirationTimer: number;

    constructor(private _http: HttpClient, private _router: RouterExtensions) {}

    signUp(email: string, password: string) {
        return this._http
            .post<IAuthResponse>(
                `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${FIREBASE_API_KEY}`,
                { email, password, returnSecureToken: true }
            )
            .pipe(
                catchError(err => {
                    this._handleError(err.error.error.message);
                    return throwError(err);
                }),
                tap(user => {
                    if (user && user.idToken) {
                        this._handleAuthSuccess(user);
                    }
                })
            );
    }

    login(email: string, password: string) {
        return this._http
            .post<IAuthResponse>(
                `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${FIREBASE_API_KEY}`,
                { email, password, returnSecureToken: true }
            )
            .pipe(
                catchError(err => {
                    this._handleError(err.error.error.message);
                    return throwError(err);
                }),
                tap(user => {
                    if (user && user.idToken) {
                        this._handleAuthSuccess(user);
                    }
                })
            );
    }

    logout() {
        this._user.next(null);
        //remove the data with that key from the device
        remove("userData");
        if (this._tokenExpirationTimer) {
            clearTimeout(this._tokenExpirationTimer);
        }
        // clearHistry removes the back button
        this._router.navigate(["/auth"], { clearHistory: true });
    }

    autoLogin() {
        //check if there is data with that key in the device
        if (!hasKey("userData")) {
            return of(false);
        }

        const userData: {
            email: string;
            userId: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(getString("userData"));

        const loadedUser = new User(
            userData.email,
            userData.userId,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.isAuthenticated) {
            this._user.next(loadedUser);
            this.autoLogout(loadedUser.timeToExpiry);
            return of(true);
        }
        return of(false);
    }

    autoLogout(expiryDuration: number) {
        setTimeout(() => {
            this.logout();
        }, expiryDuration);
    }

    _handleAuthSuccess(user) {
        const expirationDate = new Date(
            new Date().getTime() +
                // this comes in seconds and is converted to milliseconds
                parseInt(user.expiresIn) * 1000
        );

        const loadedUser = new User(
            user.email,
            user.localId,
            user.idToken,
            expirationDate
        );

        //storing the user in the device
        setString("userData", JSON.stringify(loadedUser));
        this.autoLogout(loadedUser.timeToExpiry);
        this._user.next(loadedUser);
    }

    _handleError(errorMessage: string) {
        switch (errorMessage) {
            case ErrorResponse.EMAIL_EXISTS:
                alert("This email address exists already.");
                break;
            case ErrorResponse.INVALID_PASSWORD:
                alert("Authentication failed, check your credentials.");
                break;
            default:
                alert("Authentication failed, check your credentials.");
        }
    }
}
