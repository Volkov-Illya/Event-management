import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms/';
import { Observable } from 'rxJs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../_services/alert.service';
import { AuthService } from '../../../_services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalSettingsService } from '../../../_services/localsettings.service';
import { Subscription } from 'rxJs/Subscription';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SigninComponent implements OnInit {

    loading: boolean = false;
    returnUrl: string;
    private subscription: Subscription;


    constructor(
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private translate: TranslateService,
        private _localSettings: LocalSettingsService) { }


    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/main';
        this.subscription = this._localSettings.currentTranslate.subscribe(language => this.translate.use(language));

    };

    @ViewChild('f') signinForm: NgForm;

    user = {
        email: '',
        password: ''
    };

    onSubmit() {

        this.loading = true;

        this.user.email = this.signinForm.value.userData.email;
        this.user.password = this.signinForm.value.userData.password;

        this.authService.signinUser(this.user)
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
