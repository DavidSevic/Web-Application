import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisnikNekretnineComponent } from './korisnik-nekretnine.component';

describe('KorisnikNekretnineComponent', () => {
  let component: KorisnikNekretnineComponent;
  let fixture: ComponentFixture<KorisnikNekretnineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KorisnikNekretnineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KorisnikNekretnineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
