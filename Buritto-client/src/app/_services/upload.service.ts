import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';

import { environment } from '../../environments/environment';

@Injectable()
export class UploadService {

    public apiLink: string;


    constructor(private http: HttpClient) {

        this.apiLink = `${environment.apiLink}`;

    }

    uploadLogo(file) {

        let headers = new HttpHeaders();
        headers.append('X-Requested-With', 'XMLHttpRequest');

        return this.http.post(`${this.apiLink}/upload`, file, { headers })
            .map(data => {

                return data;

            });

    }

}

