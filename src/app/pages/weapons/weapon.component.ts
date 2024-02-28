import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Weapon} from "../../models";
import {WeaponService} from "../../services/weapon.service";
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.css']
})
export class WeaponComponent implements OnInit, OnDestroy {
  public weapons: Weapon[] = [];
  protected _subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private weaponService: WeaponService,
  ) {
    this._subscription = new Subscription();
  }

  public ngOnInit(): void {
    this.getWeapons();
  }

  public getWeapons(): void {
    const weaponSubscription = this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
    this._subscription.add((weaponSubscription));
  }

  public ngOnDestroy() {
    this._subscription?.unsubscribe();
  }
}
