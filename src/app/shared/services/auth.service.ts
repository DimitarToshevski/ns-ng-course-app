import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { ErrorResponse } from "../enums/error-response.enum";
import { alert } from "tns-core-modules/ui/dialogs";

const FIREBASE_API_KEY = "AIzaSyD7OpMdUhH4w5p1Vro2i99uwoVxcffh1uE";

@Injectable({ providedIn: "root" })
export class AuthService {
    constructor(private _http: HttpClient) {}

    signUp(email: string, password: string) {
        return this._http
            .post(
                `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${FIREBASE_API_KEY}`,
                { email, password, returnSecureToken: true }
            )
            .pipe(
                catchError(err => {
                    this._handleError(err.error.error.message);
                    return throwError(err);
                })
            );
    }

    login(email: string, password: string) {
        return this._http
            .post(
                `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${FIREBASE_API_KEY}`,
                { email, password, returnSecureToken: true }
            )
            .pipe(
                catchError(err => {
                    this._handleError(err.error.error.message);
                    return throwError(err);
                })
            );
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
