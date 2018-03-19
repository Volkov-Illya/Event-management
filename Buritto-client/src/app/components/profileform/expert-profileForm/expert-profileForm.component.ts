import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ElementRef } from '@angular/core';
import { ExpertService } from '../../../_services/expert.service';
import { AlertService } from '../../../_services/alert.service';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { LocalSettingsService } from '../../../_services/localsettings.service';
import { Subscription } from 'rxJs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { UploadService } from '../../../_services/upload.service';

@Component({
    selector: 'app-expert-profileForm',
    templateUrl: './expert-profileForm.component.html',
    styleUrls: ['./expert-profileForm.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ExpertProfileFormComponent implements OnInit {

    public subscription: Subscription;

    public region = '';
    public regionId = '';
    public age = '';
    public experience = '';

    public works = [];
    public language;

    public userpic = '';
    public logo;

    public userCV = '';
    public resume;

    public loading = false;

    private file: any = [];
    private invalidFiles: any = [];

    public regionData: any = '';
    public regionSettings: any;
    selectedRegion: boolean = false;

    visible: boolean = true;
    selectable: boolean = true;
    removable: boolean = true;
    addOnBlur: boolean = true;

    separatorKeysCodes = [ENTER, COMMA];


    constructor(private renderer: Renderer2,
        private router: Router,
        private expertService: ExpertService,
        private uploadService: UploadService,
        private alertService: AlertService,
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

        });

    }

    ngOnInit() {

    }

    @ViewChild('step1') signupStepOne: NgForm;
    @ViewChild('step2') signupStepTwo: NgForm;
    @ViewChild('step3') signupStepThree: NgForm;
    @ViewChild('cvLabel') cvLabel: ElementRef;
    @ViewChild('userpicLabel') userpicLabel: ElementRef;
    @ViewChild('worksInput') worksInput: ElementRef;
    @ViewChild('matgroup') matgroup: ElementRef;
    @ViewChild('userData') userData: ElementRef;


    fieldsOfWork = ['QA', 'UX', 'UI', 'NODEJS'];

    userInfo = localStorage.getItem('user');

    user = {
        firstname: '',
        lastname: '',
        middlename: '',
        age: '',
        experience: '',
        region: '',
        regionId: '',

        works: [],
        description: '',

        userpic: '',
        userCV: '',
        interests: '',
        userId: ''
    };

    // get Placeholder

    getPlaceholder() {

        this.worksInput.nativeElement.click();

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
        let uploadPresetExpertCV = environment.uploadPresetExpertCV;

        formData.append('upload_preset', uploadPresetExpertCV);
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
        let uploadPresetExpert = environment.uploadPresetExpert;

        formData.append('upload_preset', uploadPresetExpert);
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

    setAge(age) {

        let parent = document.querySelector('.age-form');
        let ageDropdown = parent.querySelector('.mat-form-field-label');
        this.renderer.setStyle(ageDropdown, 'display', 'none');

    };

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

        this.user = this.signupStepOne.value.userData;

        this.user.userpic = '';
        this.user.userCV = '';

    };

    goToThirdStep() {

        if (this.signupStepTwo.invalid || this.user['regionId'] === undefined || !this.user['regionId'].length || !this.works.length) return;

        this.matgroup["selectedIndex"] = 2
        this.user.description = this.signupStepTwo.value.userData.description;
        this.user.works = this.works;

    };

    finishRegistration() {

        if (this.signupStepThree.invalid) return;

        this.user.interests = this.signupStepThree.value.userData.interests;
        this.user.userId = JSON.parse(this.userInfo).userId;

        this.expertService.profileForm(this.user)
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
