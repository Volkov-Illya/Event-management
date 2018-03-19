import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreloadAllModules } from '@angular/router';

import { AuthResolve } from './_guards/auth-resolve.service';
import { AuthMain } from './_guards/auth-main.service';
import { AuthProfile } from './_guards/auth-profile.service';

const appRoutes: Routes = [
    { path: 'experts', loadChildren: './components/experts/experts.module#ExpertsModule', resolve: { auth: AuthMain } },
    { path: 'events', loadChildren: './components/events/events.module#EventsModule', resolve: { auth: AuthMain } },
    { path: 'main', loadChildren: './components/main/main.module#MainModule', resolve: { auth: AuthMain } },
    { path: 'profile', loadChildren: './components/profile/profile.module#ProfileModule', resolve: { auth: AuthMain } },
    { path: 'profileform', loadChildren: './components/profileform/profileform.module#ProfileformModule', resolve: { auth: AuthProfile } },
    { path: 'auth', loadChildren: './components/auth/auth.module#AuthModule', resolve: { auth: AuthResolve } },
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: '**', redirectTo: 'auth' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
