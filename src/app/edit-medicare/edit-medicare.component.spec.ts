import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMedicareComponent } from './edit-medicare.component';

describe('EditMedicareComponent', () => {
  let component: EditMedicareComponent;
  let fixture: ComponentFixture<EditMedicareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMedicareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMedicareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
