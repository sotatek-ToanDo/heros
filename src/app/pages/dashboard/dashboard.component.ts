import {Component, OnDestroy, OnInit} from '@angular/core';
import {Hero} from '../../models/hero';
import {HeroService} from '../../services/hero.service';
import {Subscription} from "rxjs";
import Konva from "konva";
import {ArmourService} from "../../services/armour.service";
import {Armour, Weapon} from "../../models";
import {WeaponService} from "../../services/weapon.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public heroes: Hero[] = [];
  public armours: Armour[] = [];
  public weapons: Weapon[] = [];
  public listHero: Hero[] = [];
  protected _subscription: Subscription;

  constructor(private heroService: HeroService,
              private armourService: ArmourService,
              private weaponService: WeaponService) {
    this._subscription = new Subscription();
  }

  public ngOnInit(): void {
    this.getHeroes();
    this.getArmours();
    this.getWeapons();
    this.heroes.forEach((item, i) => {
      item.weapon = this.weapons[i].damage ? this.weapons[i].damage : 20;
      item.health += this.armours[i].health || 0;
    })
  }

  public getHeroes(): void {
    const dashboardSubscription = this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
    this._subscription.add(dashboardSubscription);
  }

  public dragImage(hero: Hero): void {
    if (!this.listHero.includes(hero) && this.listHero.length <= 2) {
      this.listHero.push(hero);
    }

    const width: number = window.innerWidth;
    const height: number = window.innerHeight;
    const stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: height,
    });

    const layer = new Konva.Layer();
    stage.add(layer);

    // @ts-ignore
    const darthVaderImg = new Konva.Image({
      x: 20,
      y: 20,
      width: 200,
      height: 137,
      strokeWidth: 10,
      draggable: true,
    });
    layer.add(darthVaderImg);

    // @ts-ignore
    const yodaImg = new Konva.Image({
      x: 240,
      y: 20,
      width: 200,
      height: 137,
      draggable: true,
      strokeWidth: 10,
    });
    layer.add(yodaImg);
    const imageObj1 = new Image();
    imageObj1.onload = function () {
      darthVaderImg.image(imageObj1);
    };
    imageObj1.src = this.listHero[0].srcImage;
    const imageObj2 = new Image();
    imageObj2.onload = function () {
      yodaImg.image(imageObj2);
    };
    imageObj2.src = this.listHero[1] ? this.listHero[1].srcImage : '';
    layer.on('mouseover', (evt) => {
      const shape = evt.target as Konva.Shape;
      document.body.style.cursor = 'pointer';
      shape.strokeEnabled(false);
    });

    layer.on('mouseout', (evt) => {
      const shape = evt.target as Konva.Shape;
      document.body.style.cursor = 'default';
      shape.strokeEnabled(true);
    });
  }

  public startBattle(): void {
    // @ts-ignore
    this.listHero[1].health = this.listHero[1].health - this.listHero[0]?.weapon;
    if (this.listHero[1].health <= 50) {
      this.reDrawImage();
    }
  }

  public reDrawImage(): void {
    const width: number = window.innerWidth;
    const height: number = window.innerHeight;
    const stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: height,
    });

    const layer = new Konva.Layer();
    stage.add(layer);

    // @ts-ignore
    const darthVaderImg = new Konva.Image({
      x: 20,
      y: 20,
      width: 200,
      height: 137,
      strokeWidth: 10,
      draggable: true,
    });
    layer.add(darthVaderImg);

    const imageObj1 = new Image();
    imageObj1.onload = function () {
      darthVaderImg.image(imageObj1);
    };
    imageObj1.src = this.listHero[0].srcImage;

    if (this.listHero[1].health >= 0) {
      // @ts-ignore
      const yodaImg = new Konva.Image({
        x: 240,
        y: 20,
        width: 200,
        height: 137,
        draggable: true,
        stroke: 'red',
        strokeWidth: 10,
      });
      layer.add(yodaImg);
      const imageObj2 = new Image();
      imageObj2.onload = function () {
        yodaImg.image(imageObj2);
      };
      imageObj2.src = (this.listHero[1]) ? this.listHero[1].srcImage : '';
    }

    layer.on('mouseover', (evt) => {
      const shape = evt.target as Konva.Shape;
      document.body.style.cursor = 'pointer';
      shape.strokeEnabled(false);
    });

    layer.on('mouseout', (evt) => {
      const shape = evt.target as Konva.Shape;
      document.body.style.cursor = 'default';
      shape.strokeEnabled(true);
    });
  }

  public getArmours(): void {
    const armourSubscription = this.armourService.getArmours()
      .subscribe(armour => this.armours = armour);
    this._subscription.add(armourSubscription);
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
