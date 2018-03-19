import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { SignupComponent } from "./signup/signup.component";
import { SigninComponent } from "./signin/signin.component";


const authRoutes: Routes = [
    { path: '', component: AuthComponent,
        children: [
            { path: 'signup', component: SignupComponent },
            { path: 'signin', component: SigninComponent },
            { path: '**', redirectTo: 'signup', pathMatch: 'full' },
            // {path: '404', component: NotFoundComponent},
            // {path: '**', redirectTo: '/404'}
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule {

}