import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfileformComponent } from "./profileform.component";


const mainRoutes: Routes = [
    { path: '', component: ProfileformComponent }
]

@NgModule({
    imports: [
        RouterModule.forChild(mainRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ProfileformRoutingModule {

}