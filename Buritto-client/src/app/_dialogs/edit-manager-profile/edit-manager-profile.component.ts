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
    selector: 'app-edit-manager-profile',
    templateUrl: './edit-manager-profile.component.html',
    styleUrls: ['./edit-manager-profile.component.scss'],
    encapsulation: ViewEncapsulation.None

})

export class EditManagerProfileComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA) public profileData: any,
        private renderer: Renderer2,
        public dialogRef: MatDialogRef<EditManagerProfileComponent>,
        private translate: TranslateService,
        private alertService: AlertService,
        private uploadService: UploadService,
        private _localSettings: LocalSettingsService) {

        this.subscription = this._localSettings.currentTranslate.subscribe(language => {

            this.translate.use(language);

            this.translate.get('EDITPROFILE.PLACEHOLDER.SEARCH').subscribe(res => {

                this.regionSettings = {
                    showRecentSearch: false,
                    showSearchButton: false,
                    showCurrentLocation: false,
                    recentStorageName: 'regionData',
                    inputPlaceholderText: res,
                    geoTypes: ['(cities)'],
                    noOfRecentSearchSave: 8,
                    inputString: this.profileData.userInfo.region
                };

            })

        });

    }

    public subscription: Subscription;
    private invalidFiles: any = [];


    visible: boolean = true;
    selectable: boolean = true;
    removable: boolean = true;
    addOnBlur: boolean = true;
    separatorKeysCodes = [ENTER, COMMA];
    regionSettings: any;
    region: string = this.profileData.userInfo.region;
    regionId: string = this.profileData.userInfo.regionId;
    experience: number = + this.profileData.userInfo.experience;
    works: Array<string> = this.profileData.userInfo.works;
    medias: Array<string> = this.profileData.userInfo.medias;
    logo: any = '';
    loading: boolean = false;
    userInfo: any = {};
    selectedRegion: boolean = false;
    formValid: boolean = false;


    ngOnInit() { }

    @ViewChild('userpicLabel') userpicLabel: ElementRef;
    @ViewChild('editProfile') editProfile: NgForm;
    @ViewChild('worksInput') worksInput: ElementRef;
    @ViewChild('mediasInput') mediasInput: ElementRef;

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

    ngAfterViewInit() {

        if (this.works.length) {

            let parent = document.querySelector('.works-input');
            let workLabel = parent.querySelector('.mat-form-field-placeholder');
            this.renderer.setStyle(workLabel, 'display', 'none');

        }

        if (this.medias.length) {

            let parent = document.querySelector('.medias-input');
            let mediaLabel = parent.querySelector('.mat-form-field-placeholder');
            this.renderer.setStyle(mediaLabel, 'display', 'none');

        }

    }

    setExperience(experience) {

        this.experience = experience.source.value;

    };

    setNewWork(work) {

        let parent = document.querySelector('.works-input');
        let workLabel = parent.querySelector('.mat-form-field-placeholder ');

        if (work.length || this.works.length) {

            this.renderer.setStyle(workLabel, 'display', 'none');

        } else {

            this.renderer.setStyle(workLabel, 'display', 'block');

        }

    }

    addWork(event: MatChipInputEvent): void {

        let input = event.input;
        let value = event.value;

        if ((value || '').trim()) {

            this.works.push(value.trim());

        }

        if (input) {

            input.value = '';

        }

    }

    removeWork(work: any): void {

        let parent = document.querySelector('.works-input');
        let workLabel = parent.querySelector('.mat-form-field-placeholder ');

        let index = this.works.indexOf(work);

        if (index >= 0) {

            this.works.splice(index, 1);

        }

        if (!this.works.length) {

            this.renderer.setStyle(workLabel, 'display', 'block');

        }

    }

    setNewMedia(media) {

        let parent = document.querySelector('.medias-input');
        let mediaLabel = parent.querySelector('.mat-form-field-placeholder ');

        if (media.length || this.medias.length) {

            this.renderer.setStyle(mediaLabel, 'display', 'none');

        } else {

            this.renderer.setStyle(mediaLabel, 'display', 'block');

        }

    }

    addMedia(event: MatChipInputEvent): void {

        let input = event.input;
        let value = event.value;

        if ((value || '').trim()) {

            this.medias.push(value.trim());

        }

        if (input) {

            input.value = '';

        }

    }

    removeMedia(media: any): void {

        let parent = document.querySelector('.medias-input');
        let mediaLabel = parent.querySelector('.mat-form-field-placeholder ');

        let index = this.medias.indexOf(media);

        if (index >= 0) {

            this.medias.splice(index, 1);

        }

        if (!this.medias.length) {

            this.renderer.setStyle(mediaLabel, 'display', 'block');

        }

    }


    onDragUserpic(file: Array<File>) {

        this.logo = file[0];

        this.uploadLogo();

    }

    onInvalidDragUserpic(file: Array<File>) {

        this.invalidFiles = file;

    }

    onUploadUserpic(file) {

        this.userpicLabel.nativeElement.click()

    }

    onChangeUserpic(event) {

        let fileList: FileList = event.target.files;

        if (fileList.length > 0) {

            let file: File = fileList[0];

            this.logo = file;

            this.uploadLogo();

        }

    }

    createUploadParams() {

        let formData: FormData = new FormData();
        let uploadPresetManager = environment.uploadPresetManager;

        formData.append('upload_preset', uploadPresetManager);
        formData.append('file', this.logo);

        return formData;

    }

    uploadLogo() {

        this.loading = true;

        const params = this.createUploadParams();

        this.uploadService.uploadLogo(params)
            .subscribe(
                data => {
                    this.profileData.userInfo.userpic = data['public_id'];
                    this.loading = false;
                },
                error => {
                    console.log(error)
                    this.alertService.error(error);
                    this.loading = false;
                }
            );

    }

    // Form validation

    checkRegion() {

        this.regionId = '';
        this.region = '';
        this.selectedRegion = false;

    }

    checkWorks(value) {

        if (value.touched && !this.works.length) return true;

    }

    checkMedias(value) {

        if (value.touched && !this.medias.length) return true;

    }

    noWhitespaceValidator(value) {

        return value.model.trim();

    }

    checkForm() {

        for (var key in this.editProfile.value.eventData) {

            if (!this.editProfile.value.eventData[key].trim().length && key !== 'works' && key !== 'medias') {

                return true;

            }

        }

    }

    saveProfileInfo() {

        this.userInfo.userpic = this.profileData.userInfo.userpic;
        this.userInfo.region = this.region;
        this.userInfo.regionId = this.regionId;
        this.userInfo.experience = this.experience;
        this.userInfo.works = this.works;
        this.userInfo.medias = this.medias;
        this.userInfo.firstName = this.editProfile.value.eventData.firstName;
        this.userInfo.lastName = this.editProfile.value.eventData.lastName;
        this.userInfo.middleName = this.editProfile.value.eventData.middleName;
        this.userInfo.interests = this.editProfile.value.eventData.interests;
        this.userInfo.userId = JSON.parse(localStorage.getItem('user')).userId;

        this.dialogRef.close(this.userInfo);

    }

    onNoClick(): void {

        this.dialogRef.close();

    }

    ngOnDestroy() {

        this.subscription.unsubscribe();

    }

}
