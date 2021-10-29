import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmeneKorisnikaComponent } from './izmene-korisnika.component';

describe('IzmeneKorisnikaComponent', () => {
  let component: IzmeneKorisnikaComponent;
  let fixture: ComponentFixture<IzmeneKorisnikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzmeneKorisnikaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IzmeneKorisnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
