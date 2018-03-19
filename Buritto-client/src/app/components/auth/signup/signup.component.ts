import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxJs';
import { Subscription } from 'rxJs/Subscription';
import { Router } from '@angular/router';
import { AlertService } from '../../../_services/alert.service';
import { AuthService } from '../../../_services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalSettingsService } from '../../../_services/localsettings.service';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {

    public loading = false;
    public returnUrl: string;
    public accountType = '';
    public subscription: Subscription;

    constructor(
        private translate: TranslateService,
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService,
        private _localSettings: LocalSettingsService) {
    }

    ngOnInit() {
        this.subscription = this._localSettings.currentTranslate.subscribe(language => this.translate.use(language));
    }

    @ViewChild('f') signupForm: NgForm;
    accountTypes = ['Expert', 'Event Manager'];

    user = {
        email: '',
        password: '',
        accountType: ''
    };

    setAccountType(accountType) {

        this.accountType = accountType.value;

    };

    onSubmit() {

        this.loading = true;

        this.user.email = this.signupForm.value.userData.email;
        this.user.password = this.signupForm.value.userData.password;
        this.user.accountType = this.accountType;

        this.authService.signupUser(this.user)
            .subscribe(

                success => {

                    this.router.navigate(['/profileform']);

                },
                error => {

                    let message = error.error.text;

                    this.alertService.error(message);
                    this.loading = false;
                });

    };

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }


}
