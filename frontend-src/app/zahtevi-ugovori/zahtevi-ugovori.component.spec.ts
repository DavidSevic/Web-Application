import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZahteviUgovoriComponent } from './zahtevi-ugovori.component';

describe('ZahteviUgovoriComponent', () => {
  let component: ZahteviUgovoriComponent;
  let fixture: ComponentFixture<ZahteviUgovoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZahteviUgovoriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZahteviUgovoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
