import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

// Services

import { AlertService } from './_services/alert.service';
import { AuthService } from './_services/auth.service';
import { ExpertService } from './_services/expert.service';
import { ManagerService } from './_services/manager.service';
import { tokenInterceptor } from './_interceptors/token.interceptor';

// Modules

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AuthResolve } from './_guards/auth-resolve.service';
import { AuthProfile } from './_guards/auth-profile.service';
import { AuthMain } from './_guards/auth-main.service';
import { SharedModule } from './_shared/shared.module';
import { LocalSettingsService } from './_services/localsettings.service';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        MaterialModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule
    ],
    exports: [
        AppRoutingModule,
    ],
    providers: [
        tokenInterceptor,
        AlertService,
        AuthService,
        ExpertService,
        ManagerService,
        AuthResolve,
        AuthProfile,
        AuthMain,
        LocalSettingsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
