
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { WEAPONS } from '../models/mock-weapons';
import { MessageService } from './message.service';
import {Weapon} from "../models";

@Injectable({ providedIn: 'root' })
export class WeaponService {

  constructor(private messageService: MessageService) { }

  public getWeapons(): Observable<Weapon[]> {
    const weapons = of(WEAPONS);
    this.messageService.add('HeroService: fetched heroes');
    return weapons;
  }

  public getWeapon(id: number): Observable<Weapon> {
    const weapon = WEAPONS.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(weapon);
  }
}
