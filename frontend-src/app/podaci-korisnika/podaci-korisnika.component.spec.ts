import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodaciKorisnikaComponent } from './podaci-korisnika.component';

describe('PodaciKorisnikaComponent', () => {
  let component: PodaciKorisnikaComponent;
  let fixture: ComponentFixture<PodaciKorisnikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodaciKorisnikaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PodaciKorisnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
