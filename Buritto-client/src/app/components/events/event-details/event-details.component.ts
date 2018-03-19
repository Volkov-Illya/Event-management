import { Component, OnInit, OnDestroy, Input, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../../../_services/event.service';
import { Subscription } from 'rxjs';
import { LocalSettingsService } from '../../../_services/localsettings.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material';
import { EditEventComponent } from '../../../_dialogs/edit-event/edit-event.component';
import { AlertService } from '../../../_services/alert.service';

@Component({
    selector: 'app-event-details',
    templateUrl: './event-details.component.html',
    styleUrls: ['./event-details.component.scss'],
    encapsulation: ViewEncapsulation.None

})

export class EventDetailsComponent implements OnInit {

    event: any;
    userId: number;
    editMode: boolean = false;

    public subscription: Subscription;

    constructor(private eventService: EventService,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        private translate: TranslateService,
        private _localSettings: LocalSettingsService,
        private alertService: AlertService) {

        this.subscription = this._localSettings.currentTranslate.subscribe(language => {

            this.translate.use(language);

        });

    }

    ngOnInit() {

        this.event = this.route.snapshot.data['event'];
        this.userId = JSON.parse(localStorage.getItem('user')).userId;

        if (this.event.ownerId === this.userId) {

            this.editMode = true;

        }

    }

    openDialog(): void {

        let dialogRef = this.dialog.open(EditEventComponent, {
            panelClass: 'editEventDialog',
            data: { event: this.event },
        });

        dialogRef.afterClosed().subscribe(result => {

            if (result) {

                this.eventService.editEvent(result)
                    .subscribe(
                        data => {
                            this.event = data.body;
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
