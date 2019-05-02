import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TextField } from "tns-core-modules/ui/text-field";
import { RouterExtensions } from "nativescript-angular/router";

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

    get emailCtrl() {
        return this.loginForm.get("email");
    }
    get passwordCtrl() {
        return this.loginForm.get("password");
    }

    constructor(private _router: RouterExtensions) {}

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
        // if (!this.loginForm.valid) {
        //     return;
        // }
        this._router.navigate(["/challenges"]);
        this.loginForm.reset();
        this.emailControlIsValid = true;
        this.passwordControlIsValid = true;
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
