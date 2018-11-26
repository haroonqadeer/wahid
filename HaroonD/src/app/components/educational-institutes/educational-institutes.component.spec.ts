import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalInstitutesComponent } from './educational-institutes.component';

describe('EducationalInstitutesComponent', () => {
  let component: EducationalInstitutesComponent;
  let fixture: ComponentFixture<EducationalInstitutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationalInstitutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalInstitutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
