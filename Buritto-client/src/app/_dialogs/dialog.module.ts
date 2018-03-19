import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SharedModule } from "../_shared/shared.module";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { Ng4GeoautocompleteModule } from "../_shared/autocomplete";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { EditManagerProfileComponent } from "./edit-manager-profile/edit-manager-profile.component";
import { EditEventComponent } from "./edit-event/edit-event.component";

export function HttpLoaderFactory(http: HttpClient) {

    return new TranslateHttpLoader(http, './assets/i18n/', '.json');

}

@NgModule({
    imports: [
        SharedModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
            }
        }),
        Ng4GeoautocompleteModule.forRoot()

    ],
    declarations: [
        EditProfileComponent,
        EditManagerProfileComponent,
        EditEventComponent
    ],
    exports: [
        TranslateModule
    ],
    entryComponents: [
        EditProfileComponent,
        EditManagerProfileComponent,
        EditEventComponent
    ],
    providers: [
    ]
})
export class DialogModule {

}
