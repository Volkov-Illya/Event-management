import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    userInfo = localStorage.getItem('user');
    accountType = JSON.parse(this.userInfo).accountType;
}
