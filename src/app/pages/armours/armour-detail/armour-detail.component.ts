import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Weapon} from "../../../models";
import {WeaponService} from "../../../services/weapon.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-armour-detail',
  templateUrl: './armour-detail.component.html',
  styleUrls: ['./armour-detail.component.css']
})
export class ArmourDetailComponent implements OnInit, OnDestroy {
  public weapon: Weapon | undefined;
  protected _subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private weaponService: WeaponService,
    private location: Location
  ) {
    this._subscription = new Subscription();
  }

  public ngOnInit(): void {
    this.getHero();
  }

  public getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.weaponService.getWeapon(id)
      .subscribe(weapon => this.weapon = weapon);
  }

  public goBack(): void {
    this.location.back();
  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }
}
