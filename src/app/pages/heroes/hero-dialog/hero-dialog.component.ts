import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Armour, Hero, Weapon} from '../../../models';
// @ts-ignore
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ArmourService} from "../../../services/armour.service";
import {WeaponService} from "../../../services/weapon.service";
import {HeroService} from "../../../services/hero.service";

@Component({
  selector: 'app-hero-dialog',
  templateUrl: './hero-dialog.component.html',
  styleUrls: ['./hero-dialog.component.scss'],
})
export class HeroDialogComponent implements OnInit, OnDestroy {
  //#region Properties

  public nameControl: FormControl;

  public healthControl: FormControl;

  public srcImageControl: FormControl;

  public armourControl: FormControl;

  public weaponControl: FormControl;

  public armours: Armour[] = [];

  public weapons: Weapon[] = [];

  public heroForm: FormGroup;

  protected _subscription: Subscription;

  public fileToUpload: any;
  public imageUrl: string = '';

  //#endregion

  //#region Accessors

  //#endregion
  public constructor(protected readonly heroModel: Hero,
                     protected readonly _activeModal: NgbActiveModal,
                     protected  readonly armourService: ArmourService,
                     protected  readonly weaponService: WeaponService,
                     protected  readonly heroService: HeroService,
                     ) {
    this.nameControl = new FormControl('', Validators.required);
    this.healthControl = new FormControl('', Validators.required);
    this.srcImageControl = new FormControl('', Validators.required);
    this.armourControl = new FormControl('', Validators.required);
    this.weaponControl = new FormControl('', Validators.required);

    this.heroForm = new FormGroup({
      name: this.nameControl,
      health: this.healthControl,
      srcImage: this.srcImageControl,
      armour: this.armourControl,
      weapon: this.weaponControl,
    });
    this._subscription = new Subscription();
  }

  //#region Constructor


  ///#region Life cycle
  public ngOnInit(): void {
    const heroes = this.heroService.getInitStep();
    console.log(heroes)
    if (this.heroModel && this.heroModel.id) {
      this.heroForm.patchValue({
        name: this.heroModel.name,
        health: this.heroModel.health,
        srcImage: this.heroModel.srcImage,
        armour: this.heroModel.armour,
        weapon: this.heroModel.weapon,
      });
    }
    this.getArmours();
    this.getWeapons();
  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  //#endregion

  ///#region Methods

  public submitUpdateChanges(): void {
    const heroModel = {
      name: this.nameControl.value,
      health: this.healthControl.value,
      srcImage: this.heroForm.controls['srcImage'].value,
      armour: this.armourControl.value,
      weapon: this.weaponControl.value,
    };
    this._activeModal.close({
      ...heroModel,
    });
    this.heroService.saveInitStep(heroModel);
  }

  public clickCloseDialog(): void {
    this._activeModal.close();
  }

  public changeAvatar(file: any): void {
    this.fileToUpload = file?.target?.files[0];

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
      this.srcImageControl.patchValue(this.imageUrl);
      this.heroForm.controls['srcImage'].patchValue(this.imageUrl);
    }
    reader.readAsDataURL(this.fileToUpload);
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
  //#endregion
}
