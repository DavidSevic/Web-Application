import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeniKorisnikComponent } from './meni-korisnik.component';

describe('MeniKorisnikComponent', () => {
  let component: MeniKorisnikComponent;
  let fixture: ComponentFixture<MeniKorisnikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeniKorisnikComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeniKorisnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
