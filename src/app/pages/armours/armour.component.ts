import {Component, OnInit, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Armour, Weapon} from "../../models";
import {Subscription} from 'rxjs';
import {ArmourService} from "../../services/armour.service";

@Component({
  selector: 'app-armour',
  templateUrl: './armour.component.html',
  styleUrls: ['./armour.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArmourComponent implements OnInit, OnDestroy {
  public armours: Armour[] = [];
  protected _subscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private armourService: ArmourService,
    private location: Location
  ) {
    this._subscription = new Subscription();
  }

  public ngOnInit(): void {
    this.getArmours();
  }

  public getArmours(): void {
    const armourSubscription = this.armourService.getArmours()
      .subscribe(armour  => this.armours = armour);
    this._subscription.add(armourSubscription);
  }

  public goBack(): void {
    this.location.back();
  }
  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }
}
