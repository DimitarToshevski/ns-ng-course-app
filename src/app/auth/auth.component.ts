import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TextField } from "tns-core-modules/ui/text-field";
import { RouterExtensions } from "nativescript-angular/router";
import { AuthService } from "../shared/services/auth.service";
import { pipe } from "rxjs";
import { finalize } from "rxjs/operators";

@Component({
    selector: "ns-auth",
    templateUrl: "./auth.component.html",
    styleUrls: ["./auth.component.css"],
    moduleId: module.id
})
export class AuthComponent implements OnInit {
    @ViewChild("passwordEl") passwordEl: ElementRef<TextField>;
    @ViewChild("emailEl") emailEl: ElementRef<TextField>;

    loginForm: FormGroup;
    emailControlIsValid = true;
    passwordControlIsValid = true;
    isLogin = true;
    isLoading = false;

    get emailCtrl() {
        return this.loginForm.get("email");
    }
    get passwordCtrl() {
        return this.loginForm.get("password");
    }

    constructor(
        private _router: RouterExtensions,
        private _authService: AuthService
    ) {}

    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl(null, {
                updateOn: "blur",
                validators: [Validators.required, Validators.email]
            }),
            password: new FormControl(null, {
                updateOn: "blur",
                validators: [Validators.required, Validators.minLength(6)]
            })
        });

        this.emailCtrl.statusChanges.subscribe(status => {
            this.emailControlIsValid = status === "VALID";
        });

        this.passwordCtrl.statusChanges.subscribe(status => {
            this.passwordControlIsValid = status === "VALID";
        });
    }

    login() {
        this.onDone();
        if (!this.loginForm.valid) {
            return;
        }
        this.emailControlIsValid = true;
        this.passwordControlIsValid = true;
        this.isLoading = true;
        if (this.isLogin) {
            this._authService
                .login(this.emailCtrl.value, this.passwordCtrl.value)
                .pipe(finalize(() => (this.isLoading = false)))
                .subscribe(() => {
                    this.loginForm.reset();
                    this._router.navigate(["/challenges"], {
                        clearHistory: true
                    });
                });
        } else {
            this._authService
                .signUp(this.emailCtrl.value, this.passwordCtrl.value)
                .pipe(finalize(() => (this.isLoading = false)))
                .subscribe(() => {
                    this.loginForm.reset();
                    this._router.navigate(["/challenges"], {
                        clearHistory: true
                    });
                });
        }
    }

    onDone() {
        this.emailEl.nativeElement.focus();
        this.passwordEl.nativeElement.focus();
        this.passwordEl.nativeElement.dismissSoftInput();
    }

    onSwitch() {
        this.isLogin = !this.isLogin;
    }
}
