import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { HeroDetailComponent } from './pages/heroes/hero-detail/hero-detail.component';
import {WeaponComponent} from "./pages/weapons/weapon.component";
import {ArmourComponent} from "./pages/armours/armour.component";
import {ArmourDetailComponent} from "./pages/armours/armour-detail/armour-detail.component";

const routes: Routes = [
  // { path: '**', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'weapons', component: WeaponComponent },
  { path: 'armours', component: ArmourComponent },
  { path: 'armour-detail/id', component: ArmourDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
