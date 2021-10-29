import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NekretninaComponent } from './nekretnina.component';

describe('NekretninaComponent', () => {
  let component: NekretninaComponent;
  let fixture: ComponentFixture<NekretninaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NekretninaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NekretninaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
