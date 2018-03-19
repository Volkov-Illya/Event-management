import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditProfileComponent } from '../../../_dialogs/edit-profile/edit-profile.component';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LocalSettingsService } from '../../../_services/localsettings.service';
import { EditManagerProfileComponent } from '../../../_dialogs/edit-manager-profile/edit-manager-profile.component';
import { ManagerService } from '../../../_services/manager.service';
import { AlertService } from '../../../_services/alert.service';

@Component({
    selector: 'app-company-profile',
    templateUrl: './company-profile.component.html',
    styleUrls: ['./company-profile.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class CompanyProfileComponent implements OnInit {

    public subscription: Subscription;
    userInfo: any;
    fullName: string;
    experience: string;

    constructor(private managerService: ManagerService,
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

        let dialogRef = this.dialog.open(EditManagerProfileComponent, {
            panelClass: 'editProfileDialog',
            data: { userInfo: JSON.parse(localStorage.getItem('user')) },
        });

        dialogRef.afterClosed().subscribe(result => {

            if (result) {

                this.managerService.editProfile(result)
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
