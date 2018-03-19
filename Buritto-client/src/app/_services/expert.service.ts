import { error } from 'selenium-webdriver';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


import { environment } from '../../environments/environment';

@Injectable()
export class ExpertService {

    public token: string;
    public apiUrl: string;

    constructor(private http: HttpClient,
        private router: Router) {

        if (localStorage.getItem('token')) {

            this.token = localStorage.getItem('token');

        }

        this.apiUrl = `${environment.apiUrl}`;


    }

    profileForm(userData) {

        return this.http.post<any>(`${this.apiUrl}/api/expert/profileForm`, userData, { observe: 'response' })
            .map(res => {

                if (res && res.body.profileComplete) {

                    localStorage.setItem('user', JSON.stringify(res.body));

                }

                return res;

            });

    }

    editProfile(userData) {

        return this.http.post<any>(`${this.apiUrl}/api/expert/editProfile`, userData, { observe: 'response' })
            .map(res => {

                if (res) {

                    localStorage.setItem('user', JSON.stringify(res.body));

                }

                return res;

            });

    }

    getAllExperts(searchParams): Observable<any> {

        let params = new HttpParams();

        for (var param in searchParams) {

            params = params.append(param, searchParams[param]);

        }

        return this.http.get(`${this.apiUrl}/api/expert/getList`, { params: params })

    }

}
