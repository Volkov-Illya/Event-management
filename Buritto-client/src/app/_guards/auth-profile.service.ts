import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthProfile implements Resolve<any> {

    constructor( private auth: AuthService,
                 private router: Router ) {}

    resolve( route: ActivatedRouteSnapshot ) {

        if ( this.auth.isAuthenticated() && this.auth.isProfileCompleted() ) {

            this.router.navigate(['/main'])
            
        }

        if ( !this.auth.isAuthenticated() && !this.auth.isProfileCompleted() ) {

            this.router.navigate(['/auth'])

        }

    }

}