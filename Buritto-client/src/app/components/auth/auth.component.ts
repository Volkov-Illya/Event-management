import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalSettingsService } from '../../_services/localsettings.service';
import { Observable } from 'rxjs/Observable';

@Component({

    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']

})
export class AuthComponent implements OnInit {

    public token: string;
    public userInfo: string;
    public profileComplete: boolean;

    constructor(private router: Router) {

    }

    ngOnInit() {
    }

}
