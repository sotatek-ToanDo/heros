import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgSelectModule} from "@ng-select/ng-select";
import {CommonModule} from "@angular/common";
import {ArmourDetailComponent} from "./pages/armours/armour-detail/armour-detail.component";
import {ArmourComponent} from "./pages/armours/armour.component";
import {MessagesComponent} from "./messages/messages.component";
import {HeroesComponent} from "./pages/heroes/heroes.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {HeroDetailComponent} from "./pages/heroes/hero-detail/hero-detail.component";
import {WeaponComponent} from "./pages/weapons/weapon.component";
import {HeroDialogComponent} from "./pages/heroes/hero-dialog/hero-dialog.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {WeaponDetailComponent} from "./pages/weapons/weapon-detail/weapon-detail.component";
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgSelectModule,
    CommonModule,
    NgbModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    WeaponComponent,
    WeaponDetailComponent,
    ArmourComponent,
    ArmourDetailComponent,
    HeroDialogComponent
  ],
  exports: [HeroDialogComponent],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
