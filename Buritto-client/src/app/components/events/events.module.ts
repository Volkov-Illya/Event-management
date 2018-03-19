import { NgModule } from "@angular/core";
import { EventsComponent } from "./events.component";
import { EventsRoutingModule } from "./events-routing.module";
import { CreateEventComponent } from './create-event/create-event.component';
import { EventsListComponent } from './events-list/events-list.component';
import { tokenInterceptor } from "../../_interceptors/token.interceptor";
import { EventService } from "../../_services/event.service";
import { UploadEventLogoDirective } from "../../_directives/createEventLogo.directive";
import { EventItemComponent } from './events-list/event-item/event-item.component';
import { PagerService } from "../../_services/pager.service";
import { SharedModule } from "../../_shared/shared.module";

import { EventDetailsComponent } from "./event-details/event-details.component";
import { EventResolve } from "./event-details/event-details.resolve";
import { DialogModule } from "../../_dialogs/dialog.module";

@NgModule({
    declarations: [
        EventsComponent,
        CreateEventComponent,
        EventsListComponent,
        // UploadEventLogoDirective,
        EventItemComponent,
        EventDetailsComponent
    ],
    imports: [
        SharedModule,
        DialogModule,
        EventsRoutingModule,
    ],
    providers: [
        tokenInterceptor,
        EventService,
        PagerService,
        EventResolve
    ]
})
export class EventsModule {

}
