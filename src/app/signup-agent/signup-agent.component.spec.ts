import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupAgentComponent } from './signup-agent.component';

describe('SignupAgentComponent', () => {
  let component: SignupAgentComponent;
  let fixture: ComponentFixture<SignupAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
