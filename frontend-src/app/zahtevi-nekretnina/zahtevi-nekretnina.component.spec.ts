import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZahteviNekretninaComponent } from './zahtevi-nekretnina.component';

describe('ZahteviNekretninaComponent', () => {
  let component: ZahteviNekretninaComponent;
  let fixture: ComponentFixture<ZahteviNekretninaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZahteviNekretninaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZahteviNekretninaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
