import {Component, OnDestroy, OnInit} from '@angular/core';
import {Hero} from '../../models/hero';
import {HeroService} from '../../services/hero.service';
import {catchError, mergeMap, of, Subscription, throwError} from "rxjs";
import Konva from "konva";
import {ArmourService} from "../../services/armour.service";
import {Armour, Weapon} from "../../models";
import {WeaponService} from "../../services/weapon.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public heroes: Hero[] = [];
  public armours: Armour[] = [];
  public weapons: Weapon[] = [];
  public listHero: Hero[] = [];
  public canvas!: HTMLCanvasElement;
  public stage!: Konva.Stage;
  public layer!: Konva.Layer;
  public intervalId: any;
  public battleCompleted = false;

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
    });
    this.initializeCanvas();
  }

  public getHeroes(): void {
    const dashboardSubscription = this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
    this._subscription.add(dashboardSubscription);
  }
  private initializeCanvas(): void {
    this.canvas = document.getElementById('container') as HTMLCanvasElement;
    this.stage = new Konva.Stage({
      container: 'container',
      width: 750,
      height: 500
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
  }
  public dragHeroToCanvas(hero: Hero): void {
    const index = this.listHero.findIndex(h => h.id === hero.id);
    if (index !== -1) {
      this.listHero.splice(index, 1);
      this.reDrawHero();
    } else {
      this.listHero.push(hero);
      this.drawHero(hero);
    }
  }
  private drawHero(hero: Hero): void {
    const imageObj = new Image();
    imageObj.src = hero.srcImage;
    imageObj.onload = () => {
      const konvaImage = new Konva.Image({
        image: imageObj,
        x: Math.random() * 600,
        y: Math.random() * 450,
        width: 150,
        height: 150,
        draggable: true
      });

      if (hero.health < 50) {
        konvaImage.stroke('red');
        konvaImage.strokeWidth(5);
      }

      konvaImage.on('click', () => {
        this.changeWeapon(hero);
      });
      this.layer.add(konvaImage);
      this.layer.batchDraw();
    };
  }
  public startBattle(): void {
    this.intervalId = setInterval(() => {
      this.attack();
      if (this.battleCompleted) {
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  public reDrawHero(): void {
    this.layer.destroyChildren();
    this.listHero.forEach(hero => {
      this.drawHero(hero);
    });
    this.layer.batchDraw();
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
  private attack(): void {
    this.listHero.forEach(attacker => {
      this.listHero.forEach(target => {
        if (attacker.id !== target.id) {
          // @ts-ignore
          target.health -= attacker.weapon;
          if (target.health <= 0) {
            const index = this.listHero.findIndex(hero => hero.id === target.id);
            this.listHero.splice(index, 1);
            this.reDrawHero();
            if (this.listHero.length === 1) {
              this.battleCompleted = true;
            }
          }
        }
      });
    });
  }

  private changeWeapon(hero: Hero ): void {
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
