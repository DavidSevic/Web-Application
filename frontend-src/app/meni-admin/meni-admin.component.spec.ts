import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeniAdminComponent } from './meni-admin.component';

describe('MeniAdminComponent', () => {
  let component: MeniAdminComponent;
  let fixture: ComponentFixture<MeniAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeniAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeniAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
