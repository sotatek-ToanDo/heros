
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import {ARMOUR } from '../models/mock-armour';
import { MessageService } from './message.service';
import {Armour} from "../models";

@Injectable({ providedIn: 'root' })
export class ArmourService {

  constructor(private messageService: MessageService) { }

  public getArmours(): Observable<Armour[]> {
    const armours = of(ARMOUR);
    this.messageService.add('HeroService: fetched heroes');
    return armours;
  }

  public getArmour(id: number): Observable<Armour> {
    const armour = ARMOUR.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(armour);
  }
}
