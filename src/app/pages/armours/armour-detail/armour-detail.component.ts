import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Weapon} from "../../../models";
import {WeaponService} from "../../../services/weapon.service";

@Component({
  selector: 'app-armour-detail',
  templateUrl: './armour-detail.component.html',
  styleUrls: [ './armour-detail.component.css' ]
})
export class ArmourDetailComponent implements OnInit {
  weapon: Weapon | undefined;

  constructor(
    private route: ActivatedRoute,
    private weaponService: WeaponService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.weaponService.getWeapon(id)
      .subscribe(weapon => this.weapon = weapon);
  }

  goBack(): void {
    this.location.back();
  }
}
