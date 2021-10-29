import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KonverzacijaComponent } from './konverzacija.component';

describe('KonverzacijaComponent', () => {
  let component: KonverzacijaComponent;
  let fixture: ComponentFixture<KonverzacijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KonverzacijaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KonverzacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
