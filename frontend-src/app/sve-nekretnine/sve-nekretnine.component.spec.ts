import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SveNekretnineComponent } from './sve-nekretnine.component';

describe('SveNekretnineComponent', () => {
  let component: SveNekretnineComponent;
  let fixture: ComponentFixture<SveNekretnineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SveNekretnineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SveNekretnineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
