import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeniAgentComponent } from './meni-agent.component';

describe('MeniAgentComponent', () => {
  let component: MeniAgentComponent;
  let fixture: ComponentFixture<MeniAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeniAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeniAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
