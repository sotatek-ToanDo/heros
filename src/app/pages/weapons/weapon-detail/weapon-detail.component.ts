import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Weapon} from "../../../models";
import {WeaponService} from "../../../services/weapon.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-weapon-detail',
  templateUrl: './weapon-detail.component.html',
  styleUrls: [ './weapon-detail.component.css' ]
})
export class WeaponDetailComponent implements OnInit {
  public weapon: Weapon[] | any = [];
  protected _subscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private weaponService: WeaponService,
    private location: Location
  ) {
    this._subscription = new Subscription();
  }

  public  ngOnInit(): void {
    this.getHero();
  }

  public getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const weaponSubscription = this.weaponService.getWeapon(id)
      .subscribe(weapon => this.weapon = weapon);
    this._subscription.add(weaponSubscription);
  }

  goBack(): void {
    this.location.back();
  }
}
