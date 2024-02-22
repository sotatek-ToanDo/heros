import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Weapon} from "../../models";
import {WeaponService} from "../../services/weapon.service";
import {catchError, finalize, mergeMap, of, Subject, Subscription, switchMap, throwError} from 'rxjs';

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.css']
})
export class WeaponComponent implements OnInit {
  public weapons: Weapon[] = [];
  protected _subscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private weaponService: WeaponService,
    private location: Location
  ) {
    this._subscription = new Subscription();
  }

  public ngOnInit(): void {
    this.getWeapons();
  }

  public getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
  }

  public goBack(): void {
    this.location.back();
  }
}
