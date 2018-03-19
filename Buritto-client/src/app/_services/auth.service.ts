import { error } from 'selenium-webdriver';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

    public token: string;
    public userInfo: string;
    public profileComplete: boolean;
    public apiUrl: string;

    constructor(private http: HttpClient,
                private router: Router) {
        
        if ( localStorage.getItem('token') ) {

            this.token = localStorage.getItem('token');
            this.userInfo = localStorage.getItem('user');
            this.profileComplete = JSON.parse( this.userInfo ).profileComplete; 

        }

        this.apiUrl = `${environment.apiUrl}`;


    }

    signupUser( authData ) {

        return this.http.post<any>(`${this.apiUrl}/api/auth/signup`, authData, {observe: 'response'})
            .map( res => {

                if ( res && res.body.token ) {

                    this.token = res.body[ 'token' ];

                    localStorage.setItem('token', JSON.stringify( this.token ));
                    localStorage.setItem( 'user', JSON.stringify( res.body.user ));
                    
                }

                return res;

            });
            
    };

    signinUser( authData ) {

        return this.http.post<any>(`${this.apiUrl}/api/auth/signin`, authData, {observe: 'response'})
            .map( res => {

                if ( res && res.body.token ) {

                    this.token = res.body[ 'token' ];
                    
                    localStorage.setItem('token', JSON.stringify( this.token ));
                    localStorage.setItem( 'user', JSON.stringify( res.body.user ));

                    return res.body;
                    
                }

            })
            

    }

    logout() {

        localStorage.clear();
        return this.router.navigate(['/auth']).then(() => this.token = null );
        
    }

    getToken() {

        this.token = localStorage.getItem('token');
        return this.token;

    }
    
    isProfileCompleted() {

        this.userInfo = localStorage.getItem('user');

        if ( this.userInfo !== null ) {

            this.profileComplete = JSON.parse( this.userInfo ).profileComplete;

            return this.profileComplete;

        }
        
    }

    isAuthenticated() {

        this.token = this.getToken();
        return this.token != null;

    }

}