import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZahteviRegistracijeComponent } from './zahtevi-registracije.component';

describe('ZahteviRegistracijeComponent', () => {
  let component: ZahteviRegistracijeComponent;
  let fixture: ComponentFixture<ZahteviRegistracijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZahteviRegistracijeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZahteviRegistracijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
