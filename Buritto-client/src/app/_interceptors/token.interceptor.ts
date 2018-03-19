import { Injectable, Inject, Injector, forwardRef } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
    HTTP_INTERCEPTORS,
    HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { AuthService } from '../_services/auth.service';
import * as _ from 'lodash';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private inj: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const auth = this.inj.get(AuthService);

        if (request.url.startsWith(`${environment.apiLink}`) || (request.url.startsWith(`${environment.apiUrl}/api/auth`))) {

            return next.handle(request);

        };

        if (auth.token) {

            request = request.clone({
                setHeaders: {
                    Authorization: JSON.parse(auth.token)
                }
            });

        }

        return next.handle(request).do((event: HttpEvent<any>) => {

            if (event instanceof HttpResponse) { }

        }, (err: any) => {

            if (err instanceof HttpErrorResponse) {

                if (_.includes([401, 403], err.status)) {

                    auth.logout()

                }

            }

        });

    }

}

export const tokenInterceptor = {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
};
