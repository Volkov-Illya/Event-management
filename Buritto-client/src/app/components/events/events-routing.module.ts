import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EventsComponent } from "./events.component";
import { CreateEventComponent } from "./create-event/create-event.component";
import { EventsListComponent } from "./events-list/events-list.component";
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventResolve } from "./event-details/event-details.resolve";


const eventsRoutes: Routes = [
    {
        path: '', component: EventsComponent,
        children: [
            { path: 'create', component: CreateEventComponent },
            { path: 'items', component: EventsListComponent },
            { path: 'item/:id', component: EventDetailsComponent, resolve: { event: EventResolve } },
            { path: '**', redirectTo: 'items', pathMatch: 'full' },
            // {path: '404', component: NotFoundComponent},
            // {path: '**', redirectTo: '/404'}
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(eventsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class EventsRoutingModule {

}
