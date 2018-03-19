import { error } from 'selenium-webdriver';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';

import { environment } from '../../environments/environment';
import { ReplaySubject } from 'rxjs/Rx';

@Injectable()
export class EventService {

    public apiUrl: string;
    public apiLink: string;

    constructor(private http: HttpClient,
        private router: Router) {

        this.apiUrl = `${environment.apiUrl}`;

    }

    createEvent(eventData) {

        return this.http.post<any>(`${this.apiUrl}/api/event/createEvent`, eventData, { observe: 'response' })
            .map(res => {

                return res;

            });

    }

    getAllEvents(searchParams): Observable<any> {

        let params = new HttpParams();

        for (var param in searchParams) {

            params = params.append(param, searchParams[param]);

        }

        return this.http.get(`${this.apiUrl}/api/event/getList`, { params: params })

    }

    getUserEvents(userId, searchParams): Observable<any> {

        let params = new HttpParams();

        params = params.append('userId', userId);

        for (var param in searchParams) {

            params = params.append(param, searchParams[param]);

        }

        return this.http.get(`${this.apiUrl}/api/event/getUserEvents`, { params: params })

    }

    getDetails(eventId): Observable<any> {

        let params = new HttpParams();

        params = params.append('eventId', eventId);

        return this.http.get(`${this.apiUrl}/api/event/getDetails`, { params: params })

    }

    editEvent(eventData): Observable<any> {

        return this.http.post<any>(`${this.apiUrl}/api/event/editEvent`, eventData, { observe: 'response' })
            .map(res => {

                return res;

            });

    }

}

