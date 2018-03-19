import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { PaginationComponent } from "./pagination/pagination.component";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AgeList } from "../_pipes/agelist.pipe";
import { MaterialModule } from "../material.module";
import { Ng4GeoautocompleteModule } from "./autocomplete";
import { CloudinaryModule, CloudinaryConfiguration } from "@cloudinary/angular-5.x";
import { Cloudinary } from 'cloudinary-core';
import { UploadService } from "../_services/upload.service";
import { UploadUserpicDirective } from "../_directives/profileformUserpic.directive";
import { UploadCVDirective } from "../_directives/profileformCV.directive";
import { UploadEventLogoDirective } from "../_directives/createEventLogo.directive";

export function HttpLoaderFactory(http: HttpClient) {

    return new TranslateHttpLoader(http, './assets/i18n/', '.json');

}

export const cloudinaryLib = {
    Cloudinary: Cloudinary
};

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
            }
        }),
        Ng4GeoautocompleteModule.forRoot(),
        CloudinaryModule.forRoot(cloudinaryLib, { cloud_name: 'burittoapp' }),

    ],
    declarations: [
        AgeList,
        UploadUserpicDirective,
        UploadEventLogoDirective,
        UploadCVDirective,
        PaginationComponent
    ],
    exports: [
        MaterialModule,
        AgeList,
        CommonModule,
        FormsModule,
        PaginationComponent,
        ReactiveFormsModule,
        TranslateModule,
        CloudinaryModule,
        Ng4GeoautocompleteModule,
        UploadCVDirective,
        UploadEventLogoDirective,
        UploadUserpicDirective
    ],
    providers: [
        UploadService
    ]
})
export class SharedModule {

}
