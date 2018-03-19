import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { EventService } from '../../../_services/event.service';

@Injectable()
export class EventResolve implements Resolve<any> {

    constructor(private eventService: EventService) { }

    resolve(route: ActivatedRouteSnapshot) {

        return this.eventService.getDetails(route.params['id']);

    }
}
