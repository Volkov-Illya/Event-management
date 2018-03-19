import { NgModule } from "@angular/core";
import { MaterialModule } from "../../material.module";
import { ProfileComponent } from "./profile.component";
import { ProfileRoutingModule } from "./profile-routing.module";
import { tokenInterceptor } from "../../_interceptors/token.interceptor";
import { AuthService } from "../../_services/auth.service";
import { ExpertProfileComponent } from './expert-profile/expert-profile.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { SharedModule } from "../../_shared/shared.module";
import { EditProfileComponent } from "../../_dialogs/edit-profile/edit-profile.component";
import { DialogModule } from "../../_dialogs/dialog.module";

@NgModule({
    declarations: [
        ProfileComponent,
        ExpertProfileComponent,
        CompanyProfileComponent,
    ],
    imports: [
        SharedModule,
        DialogModule,
        ProfileRoutingModule,
        MaterialModule,
    ],
    providers: [
        tokenInterceptor,
        AuthService,
    ]
})
export class ProfileModule {

}
