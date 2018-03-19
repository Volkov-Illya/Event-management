import { NgModule } from "@angular/core";

import { ExpertsComponent } from "./experts.component";
import { ExpertsRoutingModule } from "./experts-routing.module";
import { MaterialModule } from "../../material.module";
import { ExpertsListComponent } from './experts-list/experts-list.component';
import { ExpertItemComponent } from './experts-list/expert-item/expert-item.component';
import { tokenInterceptor } from "../../_interceptors/token.interceptor";
import { ExpertService } from "../../_services/expert.service";
import { PagerService } from "../../_services/pager.service";
import { SharedModule } from "../../_shared/shared.module";
import { Ng4GeoautocompleteModule } from '../../_shared/autocomplete/index';

@NgModule({
    declarations: [
        ExpertsComponent,
        ExpertsListComponent,
        ExpertItemComponent,
    ],
    imports: [
        SharedModule,
        ExpertsRoutingModule,
        MaterialModule,
        Ng4GeoautocompleteModule.forRoot()

    ],
    providers: [
        tokenInterceptor,
        ExpertService,
        PagerService
    ]
})
export class ExpertsModule {

}
