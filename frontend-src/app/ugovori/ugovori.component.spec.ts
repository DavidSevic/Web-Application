import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UgovoriComponent } from './ugovori.component';

describe('UgovoriComponent', () => {
  let component: UgovoriComponent;
  let fixture: ComponentFixture<UgovoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UgovoriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UgovoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
