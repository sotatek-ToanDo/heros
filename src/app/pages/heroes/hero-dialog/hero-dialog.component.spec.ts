import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDialogComponent } from './hero-dialog.component';

describe('HeroDialogComponent', () => {
  let component: HeroDialogComponent;
  let fixture: ComponentFixture<HeroDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroDialogComponent]
    });
    fixture = TestBed.createComponent(HeroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
