import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewEncapsulation, Renderer2 } from '@angular/core';
import { EventService } from '../../../_services/event.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { PagerService } from '../../../_services/pager.service';
import { LocalSettingsService } from '../../../_services/localsettings.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-events-list',
    templateUrl: './events-list.component.html',
    styleUrls: ['./events-list.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class EventsListComponent implements OnInit {

    private subscription: Subscription;

    public regionData: any = '';
    public regionSettings: any;


    public regionId = '';
    public region = '';
    public allEvents = true;
    public myEvents = false;
    public events;
    public eventsCount;
    public checkSearchValue;
    public type = 'allEvents';
    private pagesData;
    public eventStart;
    public eventFinish;
    loading = false;

    constructor(private renderer: Renderer2,
        private eventService: EventService,
        private router: Router,
        private pagerService: PagerService,
        private translate: TranslateService,
        private _localSettings: LocalSettingsService) {

        this.subscription = this._localSettings.currentTranslate.subscribe(language => {

            this.translate.use(language);

            this.translate.get('EVENTS.EVENTSLIST.SEARCHNG4').subscribe(res => {

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

        this.getAllEvents(this.event)

    }

    autoCompleteCallback(result: any): any {

        if (!result.response) {

            this.regionId = '';

        } else {

            this.region = result.data.adr_address;
            this.regionId = result.data.place_id;

        }

        this.event.regionId = this.regionId;
        this.searchEvent(this.event);

    }

    event = {
        search: '',
        eventStart: '',
        eventFinish: '',
        regionId: '',
        period: false,
        limit: 10,
        skip: 0
    };
    userInfo = localStorage.getItem('user');
    userId = JSON.parse(this.userInfo).userId;

    initPage($event) {

        this.pagesData = $event;
        this.event.skip = this.pagesData.startIndex;

        if (this.type === 'allEvents') {

            this.getAllEvents(this.event)

        } else {

            this.getUserEvents(this.event)

        }

    }

    getAllEvents(event) {

        this.loading = true;
        this.subscription = this.eventService.getAllEvents(event)
            .subscribe(
                data => {
                    this.loading = false;
                    this.events = data.eventsList;
                    this.eventsCount = data.eventsCount;
                },
                error => {
                    this.loading = false;

                    console.log(error)

                }
            );

    }

    getUserEvents(event) {

        this.loading = true;
        this.subscription = this.eventService.getUserEvents(this.userId, event)
            .subscribe(
                data => {
                    this.loading = false;
                    this.events = data.eventsList;
                    this.eventsCount = data.eventsCount;
                },
                error => {
                    this.loading = false;
                    console.log(error)

                }
            );

    }

    setEventsType(type) {

        this.type = type;
        this.event.skip = 0;

        if (this.type === 'allEvents') {

            this.myEvents = false;
            this.allEvents = true;
            this.getAllEvents(this.event);

        } else {

            this.myEvents = true;
            this.allEvents = false;
            this.getUserEvents(this.event);

        }

    }

    searchEvent(event) {

        clearTimeout(this.checkSearchValue);

        this.event.skip = 0;
        this.checkSearchValue = setTimeout(() => {

            if (event.eventStart || event.eventFinish) {

                event.period = true;

            } else {

                event.period = false;

            }

            if (this.type === 'allEvents') {

                this.getAllEvents(this.event)

            } else {

                this.getUserEvents(this.event)

            }

        }, 750);

    };

    setSearchValue(event) {

        this.event.search = event.target.value;

        this.searchEvent(this.event);

    }

    setFirstDate(event) {

        if (event === undefined) return;

        this.event.eventStart = event;

        let parent = document.querySelector('.first-picker');
        let eventStartLabel = parent.querySelector('.mat-form-field-placeholder ');

        if (this.event.eventStart || this.event.eventStart.length) {

            this.renderer.setStyle(eventStartLabel, 'display', 'none');

        } else {

            this.renderer.setStyle(eventStartLabel, 'display', 'block');

        }

        this.searchEvent(this.event);

    };

    setSecondDate(event) {

        if (event === undefined) return;

        this.event.eventFinish = event;

        let parent = document.querySelector('.second-picker');
        let eventFinishLabel = parent.querySelector('.mat-form-field-placeholder ');

        if (this.event.eventFinish || this.event.eventFinish.length) {

            this.renderer.setStyle(eventFinishLabel, 'display', 'none');

        } else {

            this.renderer.setStyle(eventFinishLabel, 'display', 'block');

        }

        this.searchEvent(this.event);

    };

    createNewEvent() {

        this.router.navigate(['/events/create']);

    }

    ngOnDestroy() {

        this.subscription.unsubscribe();

    }
}
