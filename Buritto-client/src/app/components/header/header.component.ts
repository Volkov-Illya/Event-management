import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';

import { HttpEvent } from '@angular/common/http';
import { AuthService } from './../../_services/auth.service';
import { Renderer2, ElementRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocalSettingsService } from '../../_services/localsettings.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit {

    public token: string;
    public userInfo: string;
    public email: string;
    public firstName: string;
    public language: string;

    constructor(private authService: AuthService,
        private translate: TranslateService,
        private renderer: Renderer2,
        private router: Router,
        public _localSettings: LocalSettingsService) {

        let storedLang: string = _localSettings.getLanguage();

        if (storedLang !== "") {

            this.language = storedLang.toUpperCase();;
            this.translate.use(storedLang);

        } else {

            translate.setDefaultLang('en');
            _localSettings.setLanguage('en');

            this.language = "EN";

        }



    }

    setCountryFlag() {

        if (this.language === "EN") {

            return 'translate-btn-en'

        } else {

            return 'translate-btn-ru'

        }

    }

    setItemFlag(item) {

        if (item === "EN") {

            return 'translate-btn-en'

        } else {

            return 'translate-btn-ru'

        }

    }

    switchLanguage(language: string) {

        this.translate.use(language);
        this.language = language.toUpperCase();
        this._localSettings.setLanguage(language);


    }

    ngOnInit() {
    }

    onLogout() {

        this.authService.logout();

    };

    goToProfile() {

        this.router.navigate(['/profile']);

    }

    onClickMe(event) {

        // let buttonWidth = event.target.clientWidth;
        // let dropdownMenu = document.getElementsByClassName('language-dropdown-menu')[0];

        // this.renderer.setStyle(dropdownMenu, 'width', buttonWidth + 'px');

    }

    isAuthenticated() {

        if (localStorage.getItem('token')) {

            this.token = localStorage.getItem('token');
            this.userInfo = localStorage.getItem('user');
            this.email = JSON.parse(this.userInfo).email;
            this.firstName = JSON.parse(this.userInfo).firstname;

        }

        return this.authService.isAuthenticated();
    }

    isProfileCompleted() {
        return this.authService.isProfileCompleted();
    }
}
