import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../../../_services/event.service';
import { Subscription } from 'rxjs';
import { LocalSettingsService } from '../../../../_services/localsettings.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-event-item',
    templateUrl: './event-item.component.html',
    styleUrls: ['./event-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class EventItemComponent implements OnInit {

    private subscription: Subscription;

    @Input() event;
    @Input() index: number;

    constructor(private router: Router,
        private eventService: EventService,
        private translate: TranslateService,
        private _localSettings: LocalSettingsService) {

        this.subscription = this._localSettings.currentTranslate.subscribe(language => {

            this.translate.use(language);

        });

    }

    ngOnInit() {

    }

    ngOnDestroy() {

        this.subscription.unsubscribe();

    }

}
