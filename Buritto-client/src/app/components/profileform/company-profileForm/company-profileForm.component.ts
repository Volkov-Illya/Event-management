import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';
import { ManagerService } from '../../../_services/manager.service';
import { AlertService } from '../../../_services/alert.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

import { MatChipInputEvent } from '@angular/material';
import { Subscription } from 'rxjs';
import { LocalSettingsService } from '../../../_services/localsettings.service';
import { TranslateService } from '@ngx-translate/core';
import { UploadService } from '../../../_services/upload.service';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-company-profileForm',
    templateUrl: './company-profileForm.component.html',
    styleUrls: ['./company-profileForm.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CompanyProfileFormComponent implements OnInit {

    public subscription: Subscription;

    public region = '';
    public regionId = '';
    public medias = [];
    public works = [];
    public experience = '';
    public userpic = '';
    public logo;

    public userCV = '';
    public resume;

    public loading = false;

    private file: any = [];
    private invalidFiles: any = [];

    public regionSettings: any;

    selectedRegion: boolean = false;

    visible: boolean = true;
    selectable: boolean = true;
    removable: boolean = true;
    addOnBlur: boolean = true;

    separatorKeysCodes = [ENTER, COMMA];

    constructor(private renderer: Renderer2,
        private router: Router,
        private managerService: ManagerService,
        private alertService: AlertService,
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

            })

            if (this.worksInput !== undefined) {

                this.worksInput.nativeElement.click();

            }

            if (this.mediaInput !== undefined) {

                this.mediaInput.nativeElement.click();

            }

        });

    }

    ngOnInit() {
    }

    @ViewChild('step1') signupStepOne: NgForm;
    @ViewChild('step2') signupStepTwo: NgForm;
    @ViewChild('step3') signupStepThree: NgForm;
    @ViewChild('cvLabel') cvLabel: ElementRef;
    @ViewChild('userpicLabel') userpicLabel: ElementRef;
    @ViewChild('fileInputWorks') fileInputWorks: ElementRef;
    @ViewChild('fileInputMedias') fileInputMedias: ElementRef;
    @ViewChild('mediaInput') mediaInput: ElementRef;
    @ViewChild('worksInput') worksInput: ElementRef;
    @ViewChild('matgroup') matgroup: ElementRef;


    userInfo = localStorage.getItem('user');

    user = {
        firstname: '',
        lastname: '',
        middlename: '',
        experience: '',

        region: '',
        regionId: '',
        medias: [],
        works: [],

        userpic: '',
        userCV: '',
        interests: '',
        userId: ''
    };

    // get Placeholder


    getPlaceholder() {

        this.worksInput.nativeElement.click();

    }

    getMediaPlaceholder() {

        this.mediaInput.nativeElement.click();

    }

    // Set region settings

    autoCompleteCallback(result: any): any {

        if (!result.response) {

            this.user.regionId = '';
            this.user.region = '';

        } else {

            this.user.region = result.data.adr_address;
            this.user.regionId = result.data.place_id;
            this.selectedRegion = true;

        }

    }

    // Upload CV

    onFilesChange(file: Array<File>) {

        this.resume = file[0];;
        this.uploadCV();

    }

    onFileInvalids(file: Array<File>) {

        this.invalidFiles = file;

    }

    onUploadCV(file) {

        this.cvLabel.nativeElement.click()

    }

    onChangeCV(event) {

        let fileList: FileList = event.target.files;

        if (fileList.length > 0) {

            let file: File = fileList[0];

            this.resume = file;
            this.uploadCV();

        }

    }

    createUploadCVParams() {

        let formData: FormData = new FormData();
        let uploadPresetManagerCV = environment.uploadPresetManagerCV;

        formData.append('upload_preset', uploadPresetManagerCV);
        formData.append('file', this.resume);

        return formData;

    }

    uploadCV() {

        this.loading = true;

        const params = this.createUploadCVParams();

        this.uploadService.uploadLogo(params)
            .subscribe(
                data => {
                    this.user.userCV = data['public_id'];
                    this.loading = false;
                },
                error => {
                    console.log(error)
                    this.alertService.error(error);
                    this.loading = false;
                }
            );

    }

    removeCV() {

        this.user.userCV = '';

    }

    // Upload userpic

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
                    this.user.userpic = data['public_id'];
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

        this.user.userpic = '';

    }

    //  Medias settings

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

    //  Works settings

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

    setExperience(experience) {

        let parent = document.querySelector('.experience-form');
        let experienceDropdown = parent.querySelector('.mat-form-field-label');
        this.renderer.setStyle(experienceDropdown, 'display', 'none');

    };

    // Form validation

    checkRegion() {

        this.user['regionId'] = '';
        this.user['region'] = '';
        this.selectedRegion = false;

    }

    checkMedias(value) {

        if (value.touched && !this.medias.length) return true;

    }

    checkWorks(value) {

        if (value.touched && !this.works.length) return true;

    }

    checkStepOne(value) {

        if (this.signupStepOne['formDirective']['submitted']) {

            return value['invalid'];

        }

    }

    checkStepTwo(value) {

        if (this.signupStepTwo['formDirective']['submitted']) {

            if (!this.selectedRegion && value.name === 'region') {

                return true;

            }

            if (!this.medias.length && value.name === 'medias') {

                return true;

            }

            if (!this.works.length && value.name === 'works') {

                return true;

            }

            return value['invalid'];

        }

    }

    checkStepThree(value) {

        if (this.signupStepThree['formDirective']['submitted']) {

            return value['invalid'];

        }

    }

    goToSecondStep() {

        if (this.signupStepOne.invalid) return;

        this.matgroup["selectedIndex"] = 1

        this.getPlaceholder()
        this.getMediaPlaceholder()

        this.user = this.signupStepOne.value.userData;
        this.user.userpic = '';
        this.user.userCV = '';

    };

    goToThirdStep() {

        if (this.signupStepTwo.invalid || this.user['regionId'] === undefined || !this.user['regionId'].length || !this.works.length || !this.medias.length) return;

        this.matgroup["selectedIndex"] = 2
        this.user.medias = this.medias;
        this.user.works = this.works;

    };

    finishRegistration() {

        if (this.signupStepThree.invalid) return;

        this.user.interests = this.signupStepThree.value.userData.interests;
        this.user.userId = JSON.parse(this.userInfo).userId;

        this.managerService.companyProfileForm(this.user)
            .subscribe(
                data => {
                    this.loading = false;

                    this.router.navigate(['/events']);
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
