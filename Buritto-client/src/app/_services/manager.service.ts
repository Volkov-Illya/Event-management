import { error } from 'selenium-webdriver';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


import { environment } from '../../environments/environment';

@Injectable()
export class ManagerService {

    public token: string;
    public apiUrl: string;

    constructor(private http: HttpClient,
        private router: Router) {

        if (localStorage.getItem('token')) {

            this.token = localStorage.getItem('token');

        }

        this.apiUrl = `${environment.apiUrl}`;


    }

    editProfile(userData) {

        return this.http.post<any>(`${this.apiUrl}/api/manager/editProfile`, userData, { observe: 'response' })
            .map(res => {

                if (res) {

                    localStorage.setItem('user', JSON.stringify(res.body));

                }

                return res;

            });

    }

    companyProfileForm(userData) {

        return this.http.post<any>(`${this.apiUrl}/api/manager/companyProfileForm`, userData, { observe: 'response' })
            .map(res => {

                if (res && res.body.profileComplete) {

                    localStorage.setItem('user', JSON.stringify(res.body));

                }

                return res;

            });

    }

}
