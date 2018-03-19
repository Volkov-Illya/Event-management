import { Component, OnInit, OnChanges, OnDestroy, Input, ViewEncapsulation } from '@angular/core';
import { LocalSettingsService } from '../../../../_services/localsettings.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-expert-item',
    templateUrl: './expert-item.component.html',
    styleUrls: ['./expert-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ExpertItemComponent implements OnInit {

    @Input() expert;
    @Input() index: number;
    private subscription: Subscription;

    fullname;
    region;
    userpic;

    constructor(private translate: TranslateService,
        private _localSettings: LocalSettingsService) {

        this.subscription = this._localSettings.currentTranslate.subscribe(language => {

            this.translate.use(language);

        });

    }

    ngOnInit() {

        if (this.expert.userpic) {

            this.userpic = this.expert.userpic;

        }

    }

    ngOnChanges() {

        this.fullname = `${this.expert.firstname} ${this.expert.lastname}`

    }

    ngOnDestroy() {

        this.subscription.unsubscribe();

    }

}
