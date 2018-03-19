import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MainComponent } from "./main.component";
import { MainRoutingModule } from "./main-routing.module";
import { MaterialModule } from "../../material.module";

@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        ReactiveFormsModule,
        MainRoutingModule,
        MaterialModule,
    ]
})
export class MainModule {

}
