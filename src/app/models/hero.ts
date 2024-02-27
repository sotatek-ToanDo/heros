import {Armour} from "./armour";
import {Weapon} from "./weapon";

export class Hero {
  public id!: number;
  public name!: string;
  public health!: number;
  public srcImage!: string;
  public armour?: Armour[];
  public weapon?: Weapon[];
}
