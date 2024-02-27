import {Component, OnDestroy, OnInit} from '@angular/core';
import {Hero} from '../../models/hero';
import {HeroService} from '../../services/hero.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  heroes: Hero[] = [];
  protected _subscription: Subscription;

  constructor(private heroService: HeroService) {
    this._subscription = new Subscription();
  }

  public ngOnInit(): void {
    this.getHeroes();
  }

  public getHeroes(): void {
    const dashboardSubscription = this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
    this._subscription.add(dashboardSubscription);
  }

  public ngOnDestroy() {
    this._subscription?.unsubscribe();
  }
}
