import { NgModule } from "@angular/core";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { AuthComponent } from "./auth.component";
import { AuthService } from "../../_services/auth.service";
import { AuthRoutingModule } from "./auth-routing.module";
import { MaterialModule } from "../../material.module";
import { tokenInterceptor } from "../../_interceptors/token.interceptor";
import { AlertsComponent } from "../alerts/alerts.component";
import { SharedModule } from "../../_shared/shared.module";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";

import { HttpClient } from '@angular/common/http';
import { LocalSettingsService } from "../../_services/localsettings.service";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

// export function HttpLoaderFactory(http: HttpClient) {

//     return new TranslateHttpLoader(http, './assets/i18n/', '.json');

// }

@NgModule({
    declarations: [
        SigninComponent,
        SignupComponent,
        AuthComponent,
        AlertsComponent

    ],
    imports: [
        AuthRoutingModule,
        MaterialModule,
        SharedModule,
        // TranslateModule.forRoot({
        //     loader: {
        //         provide: TranslateLoader,
        //         useFactory: (HttpLoaderFactory),
        //         deps: [HttpClient]
        //     }
        // })
    ],
    providers: [
        tokenInterceptor,
        AuthService,
        // LocalSettingsService
    ]
})
export class AuthModule { }
