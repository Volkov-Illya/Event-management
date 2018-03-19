import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalSettingsService } from '../../../_services/localsettings.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material';
import { EditProfileComponent } from '../../../_dialogs/edit-profile/edit-profile.component';
import { ExpertService } from '../../../_services/expert.service';
import { AlertService } from '../../../_services/alert.service';

@Component({
    selector: 'app-expert-profile',
    templateUrl: './expert-profile.component.html',
    styleUrls: ['./expert-profile.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class ExpertProfileComponent implements OnInit {

    public subscription: Subscription;
    userInfo: any;
    fullName: string;
    experience: string;
    path;
    constructor(
        private expertService: ExpertService,
        private alertService: AlertService,
        public dialog: MatDialog,
        private translate: TranslateService,
        private _localSettings: LocalSettingsService) {

        this.subscription = this._localSettings.currentTranslate.subscribe(language => {

            this.translate.use(language);

        });

    }

    ngOnInit() {

        this.userInfo = JSON.parse(localStorage.getItem('user'));
        this.fullName = `${this.userInfo.firstname} ${this.userInfo.lastname}`;
        this.experience = this.userInfo.experience > 1 ? `${this.userInfo.experience} years` : `${this.userInfo.experience} year`;

    }

    openDialog(): void {
        let dialogRef = this.dialog.open(EditProfileComponent, {
            panelClass: 'editProfileDialog',
            data: { userInfo: JSON.parse(localStorage.getItem('user')) },
        });

        dialogRef.afterClosed().subscribe(result => {

            if (result) {

                this.expertService.editProfile(result)
                    .subscribe(
                        data => {
                            this.userInfo = data.body
                            this.fullName = `${this.userInfo.firstname} ${this.userInfo.lastname}`;
                            this.experience = this.userInfo.experience > 1 ? `${this.userInfo.experience} years` : `${this.userInfo.experience} year`;
                        },
                        error => {
                            this.alertService.error(error);
                        }
                    );
            }

        });
    }

    ngOnDestroy() {

        this.subscription.unsubscribe();

    }

}
