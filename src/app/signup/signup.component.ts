import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../_services/alert.service';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({ templateUrl: 'signup.component.html' })
export class SignupComponent implements OnInit {
    signupForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.signupForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', [Validators.required]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.signupForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.signupForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.signup(this.signupForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Sign Up successful!', true);
                    this.router.navigate(['/mainfeed']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
