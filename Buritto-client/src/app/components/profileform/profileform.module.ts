import { NgModule } from "@angular/core";
import { ProfileformComponent } from "./profileform.component";
import { ProfileformRoutingModule } from "./profileform-routing.module";
import { tokenInterceptor } from "../../_interceptors/token.interceptor";
import { AuthService } from "../../_services/auth.service";
import { ExpertProfileFormComponent } from './expert-profileForm/expert-profileForm.component';
import { CompanyProfileFormComponent } from './company-profileForm/company-profileForm.component';
import { SharedModule } from "../../_shared/shared.module";

@NgModule({
    declarations: [
        ProfileformComponent,
        ExpertProfileFormComponent,
        CompanyProfileFormComponent,

    ],
    imports: [
        SharedModule,
        ProfileformRoutingModule,
    ],
    providers: [
        tokenInterceptor,
        AuthService,
    ]
})
export class ProfileformModule {

}
