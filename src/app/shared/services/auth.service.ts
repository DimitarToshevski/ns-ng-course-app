import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";
import { throwError, BehaviorSubject } from "rxjs";
import { ErrorResponse } from "../enums/error-response.enum";
import { alert } from "tns-core-modules/ui/dialogs";
import { IAuthResponse } from "../interfaces/auth-response.interface";
import { User } from "../models/user.model";

const FIREBASE_API_KEY = "AIzaSyD7OpMdUhH4w5p1Vro2i99uwoVxcffh1uE";

@Injectable({ providedIn: "root" })
export class AuthService {
    // prop to store the user in memory instead of the local storage
    private _user = new BehaviorSubject<User>(null);
    constructor(private _http: HttpClient) {}

    get user() {
        return this._user.asObservable();
    }

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

    _handleAuthSuccess(user) {
        const exporationDate = new Date(
            new Date().getTime() +
                // this comes in seconds and is converted to milliseconds
                parseInt(user.expiresIn) * 1000
        );
        const loadedUser = new User(
            user.email,
            user.localId,
            user.idToken,
            exporationDate
        );
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
