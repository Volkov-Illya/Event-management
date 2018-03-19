import { Component, OnDestroy, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

import { PagerService } from '../../_services/pager.service';
import { Subscription } from 'rxjs';
import { LocalSettingsService } from '../../_services/localsettings.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PaginationComponent implements OnInit {

    pager: any = {};
    private subscription: Subscription;

    @Input() eventsCount: any;
    @Output() changePageEvent = new EventEmitter<any>();


    constructor(private pagerService: PagerService,
        private translate: TranslateService,
        private _localSettings: LocalSettingsService) {

        this.subscription = this._localSettings.currentTranslate.subscribe(language => {

            this.translate.use(language);

        });

    }

    ngOnInit() {

        this.setPage(1)

    }


    ngOnChanges() {

        this.setPage(1)

    }

    setPage(page: number) {

        if (page < 1 || page > this.pager.totalPages) {

            return;

        }

        this.pager = this.pagerService.getPager(this.eventsCount, page);

    }

    changePage(page: number) {

        if (page < 1 || page > this.pager.totalPages) {

            return;

        }

        this.pager = this.pagerService.getPager(this.eventsCount, page);

        this.changePageEvent.emit(this.pager)


    }

    ngOnDestroy() {

        this.subscription.unsubscribe();

    }

}
