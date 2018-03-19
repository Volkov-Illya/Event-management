import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';

import { EventService } from '../../../_services/event.service';
import { AlertService } from '../../../_services/alert.service';
import { Subscription } from 'rxjs';
import { LocalSettingsService } from '../../../_services/localsettings.service';
import { TranslateService } from '@ngx-translate/core';
import { UploadService } from '../../../_services/upload.service';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class CreateEventComponent implements OnInit {

    public subscription: Subscription;

    visible: boolean = true;
    selectable: boolean = true;
    removable: boolean = true;
    addOnBlur: boolean = true;

    public region = '';
    public regionId = '';
    public status = '';
    public tags = [];
    public domains = [];
    public statuses = ['Planning', 'In progress'];
    public logo;
    public eventLogo = '';
    public eventData;
    public firstPicker;
    public secondPicker;
    public onDragLogo;
    public onInvalidDragLogo;

    public loading = false;
    private file: any = [];
    private invalidFiles: any = [];

    public regionData: any = '';
    public placeholer: string;
    public domainPlaceholder: string;

    public regionSettings: any;

    constructor(
        private renderer: Renderer2,
        private router: Router,
        private alertService: AlertService,
        private eventService: EventService,
        private uploadService: UploadService,
        private translate: TranslateService,
        private _localSettings: LocalSettingsService) {

        this.subscription = this._localSettings.currentTranslate.subscribe(language => {

            this.translate.use(language);

            this.translate.get('PROFILEFORM.PLACEHOLDER.SEARCH').subscribe(res => {

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

            if (language === 'en') {

                this.placeholer = 'Example: #media, #economix';
                this.domainPlaceholder = 'Example: #Television, #online streaming';

            } else {

                this.placeholer = 'Пример: #СМИ, #Єкономика';
                this.domainPlaceholder = 'Пример: #Телевидиние, #онлайн трансляция';

            }

            if (this.tagsInput !== undefined) {

                this.tagsInput.nativeElement.click()

            }

            if (this.domainInput !== undefined) {

                this.domainInput.nativeElement.click()

            }

        });
    }

    separatorKeysCodes = [ENTER, COMMA];
    userInfo = localStorage.getItem('user');
    userId = JSON.parse(this.userInfo).userId;

    event = {
        eventTitle: '',
        firstPicker: '',
        secondPicker: '',
        tags: [],
        region: '',
        regionId: '',
        domains: [],
        status: '',
        description: '',
        userId: '',
        eventLogo: ''
    };

    ngOnInit() { }

    @ViewChild('createEvent') createEvent: NgForm;
    @ViewChild('logoLabel') logoLabel: ElementRef;
    @ViewChild('tagsInput') tagsInput: ElementRef;
    @ViewChild('domainInput') domainInput: ElementRef;

    // get Placeholder


    autoCompleteCallback(result: any): any {

        if (!result.response) {

            this.regionId = '';
            this.region = '';

        } else {

            this.region = result.data.adr_address;
            this.regionId = result.data.place_id;

        }

    }

    // Upload logo

    onFilesChange(file: Array<File>) {

        this.logo = file[0];
        this.uploadLogo();

    }

    onFileInvalids(file: Array<File>) {

        this.invalidFiles = file;

    }

    onUploadLogo(file) {

        this.logoLabel.nativeElement.click()

    }

    onChangeLogo(event) {

        let fileList: FileList = event.target.files;

        if (fileList.length > 0) {

            let file: File = fileList[0];

            this.logo = file;

            this.uploadLogo();
        }

    }

    // Datepicker settings

    setFirstDate(event) {

        if (event === undefined) return;

        this.event.firstPicker = event;

        let parent = document.querySelector('.first-picker');
        let firstPickerLabel = parent.querySelector('.mat-form-field-placeholder ');

        if (this.event.firstPicker || this.event.firstPicker.length) {

            this.renderer.setStyle(firstPickerLabel, 'display', 'none');

        } else {

            this.renderer.setStyle(firstPickerLabel, 'display', 'block');

        }

    };

    setSecondDate(event) {

        if (event === undefined) return;

        this.event.secondPicker = event;

        let parent = document.querySelector('.second-picker');
        let secondPickerLabel = parent.querySelector('.mat-form-field-placeholder ');

        if (this.event.secondPicker || this.event.secondPicker.length) {

            this.renderer.setStyle(secondPickerLabel, 'display', 'none');

        } else {

            this.renderer.setStyle(secondPickerLabel, 'display', 'block');

        }

    };

    //  Tags settings

    setNewTag(tag) {

        let parent = document.querySelector('.tags-input');
        let tagLabel = parent.querySelector('.mat-form-field-placeholder ');

        if (tag.length || this.tags.length) {

            this.renderer.setStyle(tagLabel, 'display', 'none');

        } else {

            this.renderer.setStyle(tagLabel, 'display', 'block');

        }

    }

    addTag(event: MatChipInputEvent): void {

        let input = event.input;
        let value = event.value;

        if ((value || '').trim()) {

            this.tags.push(value.trim());

        }

        if (input) {

            input.value = '';

        }

    }

    removeTag(tag: any): void {

        let parent = document.querySelector('.tags-input');
        let tagLabel = parent.querySelector('.mat-form-field-placeholder ');

        let index = this.tags.indexOf(tag);

        if (index >= 0) {

            this.tags.splice(index, 1);

        }

        if (!this.tags.length) {

            this.renderer.setStyle(tagLabel, 'display', 'block');

        }

    }

    //  Domains settings

    setNewDomain(domain) {

        let parent = document.querySelector('.domains-input');
        let domainLabel = parent.querySelector('.mat-form-field-placeholder ');

        if (domain.length || this.domains.length) {

            this.renderer.setStyle(domainLabel, 'display', 'none');

        } else {

            this.renderer.setStyle(domainLabel, 'display', 'block');

        }

    }

    addDomain(event: MatChipInputEvent): void {

        let input = event.input;
        let value = event.value;

        if ((value || '').trim()) {

            this.domains.push(value.trim());

        }

        if (input) {

            input.value = '';

        }

    }

    removeDomain(domain: any): void {

        let parent = document.querySelector('.domains-input');
        let domainLabel = parent.querySelector('.mat-form-field-placeholder ');

        let index = this.domains.indexOf(domain);

        if (index >= 0) {

            this.domains.splice(index, 1);

        }

        if (!this.domains.length) {

            this.renderer.setStyle(domainLabel, 'display', 'block');

        }

    }

    // Statuses settings

    setStatus(status) {

        this.status = status.source.value;
        let parent = document.querySelector('.status-form');
        let statusDropdown = parent.querySelector('.mat-form-field-label');
        this.renderer.setStyle(statusDropdown, 'display', 'none');

    };

    createUploadParams() {

        let formData: FormData = new FormData();
        let uploadPresetEvent = environment.uploadPresetEvent;

        formData.append('upload_preset', uploadPresetEvent);
        formData.append('file', this.logo);

        return formData;

    }

    uploadLogo() {

        this.loading = true;

        const params = this.createUploadParams();

        this.uploadService.uploadLogo(params)
            .subscribe(
                data => {

                    this.event.eventLogo = data['public_id'];
                    this.loading = false;

                },
                error => {
                    console.log(error)
                    this.alertService.error(error);
                    this.loading = false;
                }
            );

    }

    removeLogo() {

        this.event.eventLogo = '';

    }

    createNewEvent() {

        this.loading = true;

        this.event.eventTitle = this.createEvent.value.eventData.eventTitle;
        this.event.description = this.createEvent.value.eventData.description;
        this.event.tags = this.tags;
        this.event.domains = this.domains;
        this.event.region = this.region;
        this.event.regionId = this.regionId;
        this.event.status = this.status;
        this.event.userId = this.userId;

        this.eventService.createEvent(this.event)
            .subscribe(
                data => {
                    this.router.navigate(['/events']);
                    this.loading = false;

                },
                error => {
                    console.log(error)
                    this.alertService.error(error);
                    this.loading = false;
                }
            );
    }

    ngOnDestroy() {

        this.subscription.unsubscribe();

    }

}
