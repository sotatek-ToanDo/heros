import {Injectable, Injector} from '@angular/core';

import {from, Observable, of} from 'rxjs';

import {Hero} from '../models/hero';
import {HEROES} from '../models/mock-heroes';
import {MessageService} from './message.service';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Armour, Weapon} from "../models";
import {HeroDialogComponent} from "../pages/heroes/hero-dialog/hero-dialog.component";

@Injectable({providedIn: 'root'})
export class HeroService {
  private baseUrl = 'http://localhost:4200';
  public heroRequest = HEROES;

  constructor(private messageService: MessageService,
              private http: HttpClient,
              protected injector: Injector) {
  }

  public getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

  public getHero(id: number): Observable<Hero> {
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }

  public upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }

  displayAsync(heroModel?: Hero): Observable<{
    name: string;
    srcImage: string;
    health: number;
    id: number;
    armour?: Armour[];
    weapon?: Weapon[];
  }> {
    const bsDialogService = this.injector.get(NgbModal);
    const childInjector = Injector.create({
      providers: [
        {
          provide: Hero,
          useValue: heroModel,
        },
      ],
    });

    const dialogRef = bsDialogService.open(HeroDialogComponent, {
      centered: true,
      size: 'lg',
      injector: childInjector,
    });
    return from(dialogRef.result);
  }

  public saveInitStep(hero: any): void {
    this.heroRequest.forEach((item: Hero) =>{
      if(item.id ==hero.id){
        item.name = hero.name;
        item.health = hero.health;
        item.srcImage = hero.srcImage;
      }
    })
  }
  public getInitStep(): any {
    return this.heroRequest;
  }
}
