import {Component, OnDestroy, OnInit} from '@angular/core';

import {Hero} from '../../models/hero';
import {HeroService} from '../../services/hero.service';
import {Router} from "@angular/router";
import {catchError, mergeMap, of, Subscription, throwError} from "rxjs";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit, OnDestroy {
  public heroes: Hero[] = [];
  protected _subscription: Subscription;

  constructor(private heroService: HeroService,
              private router: Router) {
    this._subscription = new Subscription();
  }

  public ngOnInit(): void {
    this.getHeroes();
  }

  public getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  public createOrEditHero(id: number) {
    this.router.navigate((["/detail/" + id]))
  }

  public addWeaponOrArmour(hero?: Hero): void {
    const createWeaponOrArmourSubscription = this.heroService
      .displayAsync(hero)
      .pipe(
        mergeMap((heroDialogResponse) => {
          if (!heroDialogResponse) {
            return of(null);
          }
          const heroPayload = {
            name: heroDialogResponse.name,
            health: heroDialogResponse.health,
            srcImage: heroDialogResponse.srcImage,
            armour: heroDialogResponse.armour,
            weapon: heroDialogResponse.weapon,
          };
          let heroEdited = {
            id: hero?.id,
            ...heroPayload,
          };
          this.heroService.saveInitStep(heroEdited);
          this.heroes = this.heroService.getInitStep();
          return of(heroEdited);
        }),
        catchError((exception) => {
          return throwError(exception);
        }),
      )
      .subscribe((response) => {
        if (!response) {
          return;
        }
      });
    this._subscription.add(createWeaponOrArmourSubscription);
  }
  public ngOnDestroy() {
    this._subscription?.unsubscribe();
  }
}
