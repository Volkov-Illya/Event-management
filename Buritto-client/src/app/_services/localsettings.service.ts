import { Injectable, EventEmitter } from "@angular/core";
import { ReplaySubject, Subject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LocalSettingsService {


    private changeTranslate = new BehaviorSubject<string>(localStorage['ng2Language']);
    currentTranslate = this.changeTranslate.asObservable();

    constructor() { }

    getLanguage(): any {

        if (localStorage) {

            return localStorage['ng2Language'] || "";

        }

        else {

            return "";

        }

    }

    setLanguage(language: string) {

        if (localStorage) {

            this.changeTranslate.next(language)
            localStorage['ng2Language'] = language;

        }

    }


}
