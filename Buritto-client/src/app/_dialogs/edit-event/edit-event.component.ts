import { Component, OnInit, AfterViewInit, OnDestroy, Inject, ViewEncapsulation, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { LocalSettingsService } from '../../_services/localsettings.service';
import { TranslateService } from '@ngx-translate/core';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { NgForm } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { UploadService } from '../../_services/upload.service';
import { AlertService } from '../../_services/alert.service';

@Component({
    selector: 'app-edit-event',
    templateUrl: './edit-event.component.html',
    styleUrls: ['./edit-event.component.scss'],
    encapsulation: ViewEncapsulation.None

})

export class EditEventComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA) public eventData: any,
        private renderer: Renderer2,
        public dialogRef: MatDialogRef<EditEventComponent>,
        private translate: TranslateService,
        private alertService: AlertService,
        private uploadService: UploadService,
        private _localSettings: LocalSettingsService) {

        this.subscription = this._localSettings.currentTranslate.subscribe(language => {

            this.translate.use(language);

            this.translate.get('EDITEVENT.PLACEHOLDER.REGION').subscribe(res => {

                this.regionSettings = {
                    showRecentSearch: false,
                    showSearchButton: false,
                    showCurrentLocation: false,
                    recentStorageName: 'regionData',
                    inputPlaceholderText: res,
                    geoTypes: ['(cities)'],
                    noOfRecentSearchSave: 8,
                    inputString: this.eventData.event.region
                };

            })

        });

    }

    public subscription: Subscription;


    visible: boolean = true;
    selectable: boolean = true;
    removable: boolean = true;
    addOnBlur: boolean = true;
    separatorKeysCodes = [ENTER, COMMA];
    regionSettings: any;
    region: string = this.eventData.event.region;
    regionId: string = this.eventData.event.regionId;
    tags: Array<string> = this.eventData.event.tags.slice();
    domains: Array<string> = this.eventData.event.domains.slice();
    status: string = this.eventData.event.status;
    statuses = ['Planning', 'In progress'];
    selectedRegion: boolean = false;


    logo: any = '';
    loading: boolean = false;
    eventStart;
    eventFinish;

    private invalidFiles: any = [];

    eventInfo: any = {};


    ngOnInit() { }


    ngAfterViewInit() {

        if (this.eventData.event.eventStart && this.eventData.event.eventStart.length) {

            let parent = document.querySelector('.first-picker');
            let eventStartLabel = parent.querySelector('.mat-form-field-placeholder ');

            this.renderer.setStyle(eventStartLabel, 'display', 'none');

        }

        if (this.eventData.event.eventFinish && this.eventData.event.eventFinish.length) {

            let parent = document.querySelector('.second-picker');
            let eventFinishLabel = parent.querySelector('.mat-form-field-placeholder ');

            this.renderer.setStyle(eventFinishLabel, 'display', 'none');

        }

        if (this.eventData.event.tags.length) {

            let parent = document.querySelector('.tags-input');
            let tagLabel = parent.querySelector('.mat-form-field-placeholder');
            this.renderer.setStyle(tagLabel, 'display', 'none');

        }

        if (this.eventData.event.domains.length) {

            let parent = document.querySelector('.domains-input');
            let domainLabel = parent.querySelector('.mat-form-field-placeholder');
            this.renderer.setStyle(domainLabel, 'display', 'none');

        }

        if (this.eventData.event.status.length) {

            let parent = document.querySelector('.status-form');
            let statusDropdown = parent.querySelector('.mat-form-field-label');
            this.renderer.setStyle(statusDropdown, 'display', 'none');

        }

    }

    @ViewChild('eventLogoLabel') eventLogoLabel: ElementRef;
    @ViewChild('editEvent') editEvent: NgForm;

    // Region settings

    autoCompleteCallback(result: any): any {

        if (!result.response) {

            this.regionId = '';
            this.region = '';

        } else {

            this.region = result.data.adr_address;
            this.regionId = result.data.place_id;
            this.selectedRegion = true;

        }

    }

    // Datepicker settings

    setFirstDate(event) {

        if (event === undefined) return;

        this.eventInfo.eventStart = event;

        let parent = document.querySelector('.first-picker');
        let eventStartLabel = parent.querySelector('.mat-form-field-placeholder ');

        if (this.eventInfo.eventStart || this.eventInfo.eventStart.length) {

            this.renderer.setStyle(eventStartLabel, 'display', 'none');

        } else {

            this.renderer.setStyle(eventStartLabel, 'display', 'block');

        }

    };

    setSecondDate(event) {

        if (event === undefined) return;

        this.eventInfo.eventFinish = event;

        let parent = document.querySelector('.second-picker');
        let eventFinishLabel = parent.querySelector('.mat-form-field-placeholder ');

        if (this.eventInfo.eventFinish || this.eventInfo.eventFinish.length) {

            this.renderer.setStyle(eventFinishLabel, 'display', 'none');

        } else {

            this.renderer.setStyle(eventFinishLabel, 'display', 'block');

        }

    };

    // Tag settings

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

    // Domain settings

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

    // Logo settings

    onDragEventLogo(file: Array<File>) {

        this.logo = file[0];

        this.uploadEventLogo();

    }

    onInvalidDragEventLogo(file: Array<File>) {

        this.invalidFiles = file;

    }

    onUploadEventLogo(file) {

        this.eventLogoLabel.nativeElement.click()

    }

    onChangeEventLogo(event) {

        let fileList: FileList = event.target.files;

        if (fileList.length > 0) {

            let file: File = fileList[0];

            this.logo = file;

            this.uploadEventLogo();

        }

    }

    createUploadParams() {

        let formData: FormData = new FormData();
        let uploadPresetEvent = environment.uploadPresetEvent;

        formData.append('upload_preset', uploadPresetEvent);
        formData.append('file', this.logo);

        return formData;

    }

    uploadEventLogo() {

        this.loading = true;

        const params = this.createUploadParams();

        this.uploadService.uploadLogo(params)
            .subscribe(
                data => {
                    this.eventData.event.eventLogo = data['public_id'];
                    this.loading = false;
                },
                error => {
                    console.log(error)
                    this.alertService.error(error);
                    this.loading = false;
                }
            );

    }

    // Status settings

    setStatus(status) {

        this.status = status.source.value;
        let parent = document.querySelector('.status-form');
        let statusDropdown = parent.querySelector('.mat-form-field-label');
        this.renderer.setStyle(statusDropdown, 'display', 'none');

    };

    // Form validation

    checkRegion() {

        this.regionId = '';
        this.region = '';
        this.selectedRegion = false;

    }

    // Save changes

    saveEventInfo() {

        this.eventInfo.eventLogo = this.eventData.event.eventLogo;
        this.eventInfo.eventTitle = this.editEvent.value.eventInfo.eventTitle;
        this.eventInfo.eventStart = this.editEvent.value.eventInfo.eventStart;
        this.eventInfo.eventFinish = this.editEvent.value.eventInfo.eventFinish;
        this.eventInfo.region = this.region;
        this.eventInfo.regionId = this.regionId;
        this.eventInfo.tags = this.tags;
        this.eventInfo.domains = this.domains;
        this.eventInfo.status = this.status;
        this.eventInfo.description = this.editEvent.value.eventInfo.description;
        this.eventInfo.eventId = this.eventData.event.eventId;

        this.dialogRef.close(this.eventInfo);

    }

    onNoClick(): void {

        this.dialogRef.close();

    }

    ngOnDestroy() {

        this.subscription.unsubscribe();

    }

}
