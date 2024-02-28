import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {Hero} from '../../../models/hero';
import {HeroService} from '../../../services/hero.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit, OnDestroy {
  public hero!: Hero[] | any;
  protected _subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this.getHero();
  }

  public getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const heroDetailSubscription = this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
    this._subscription.add(heroDetailSubscription);
  }

  public goBack(): void {
    this.location.back();
  }

  public ngOnDestroy() {
    this._subscription?.unsubscribe();
  }
}
