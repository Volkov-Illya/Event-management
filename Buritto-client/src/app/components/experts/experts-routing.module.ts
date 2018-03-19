import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ExpertsComponent } from "./experts.component";
import { ExpertsListComponent } from "./experts-list/experts-list.component";


const expertsRoutes: Routes = [
    { path: '', component: ExpertsComponent ,
        children: [
            { path: 'items', component: ExpertsListComponent },
            { path: '**', redirectTo: 'items', pathMatch: 'full' },
            // {path: '404', component: NotFoundComponent},
            // {path: '**', redirectTo: '/404'}
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(expertsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ExpertsRoutingModule {

}