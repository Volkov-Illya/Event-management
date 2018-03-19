import { Component, OnInit, OnDestroy, ViewEncapsulation, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { PagerService } from '../../../_services/pager.service';
import { ExpertService } from '../../../_services/expert.service';
import { LocalSettingsService } from '../../../_services/localsettings.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-experts-list',
    templateUrl: './experts-list.component.html',
    styleUrls: ['./experts-list.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class ExpertsListComponent implements OnInit {

    public regionData: any = '';

    public regionSettings: any;

    public regionId = '';
    public region = '';
    public experts;
    public expertsCount;
    public checkSearchValue;
    private subscription: Subscription;
    private pagesData;
    loading = false;

    constructor(private renderer: Renderer2,
        private expertService: ExpertService,
        private router: Router,
        private pagerService: PagerService,
        private translate: TranslateService,
        private _localSettings: LocalSettingsService) {

        this.subscription = this._localSettings.currentTranslate.subscribe(language => {

            this.translate.use(language);

            this.translate.get('EXPERTS.EXPERTSLIST.SEARCHNG4').subscribe(res => {

                this.regionSettings = {
                    showRecentSearch: false,
                    showSearchButton: false,
                    showCurrentLocation: false,
                    recentStorageName: 'regionData',
                    inputPlaceholderText: res,
                    geoTypes: ['(cities)'],
                    noOfRecentSearchSave: 8
                };

            });

        });

    }

    ngOnInit() {

        this.getAllExperts(this.expert)

    }

    expert = {
        search: '',
        regionId: '',
        limit: 10,
        skip: 0
    };
    userInfo = localStorage.getItem('user');
    userId = JSON.parse(this.userInfo).userId;

    autoCompleteCallback(result: any): any {

        if (!result.response) {

            this.regionId = '';

        } else {

            this.region = result.data.adr_address;
            this.regionId = result.data.place_id;

        }

        this.expert.regionId = this.regionId;
        this.searchExpert(this.expert);

    }

    initPage($expert) {

        this.pagesData = $expert;
        this.expert.skip = this.pagesData.startIndex;
        this.getAllExperts(this.expert)

    }

    getAllExperts(expert) {

        this.loading = true;
        this.subscription = this.expertService.getAllExperts(expert)
            .subscribe(
                data => {
                    this.loading = false;
                    this.experts = data.expertsList;
                    this.expertsCount = data.expertsCount;
                },
                error => {
                    this.loading = false;
                    console.log(error)

                }
            );

    }

    searchExpert(expert) {

        clearTimeout(this.checkSearchValue);

        this.expert.skip = 0;
        this.checkSearchValue = setTimeout(() => {

            this.getAllExperts(this.expert)

        }, 750);

    };

    setSearchValue(expert) {

        this.expert.search = expert.target.value;

        this.searchExpert(this.expert);

    }

    ngOnDestroy() {

        this.subscription.unsubscribe();

    }

}
