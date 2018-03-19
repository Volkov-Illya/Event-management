import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-profileform',
    templateUrl: './profileform.component.html',
    styleUrls: ['./profileform.component.scss']
})

export class ProfileformComponent implements OnInit {

    constructor() { }

    ngOnInit() { }

    userInfo = localStorage.getItem('user');
    accountType = JSON.parse(this.userInfo).accountType;

}
