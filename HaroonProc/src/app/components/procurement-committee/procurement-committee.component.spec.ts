import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementCommitteeComponent } from './procurement-committee.component';

describe('ProcurementCommitteeComponent', () => {
  let component: ProcurementCommitteeComponent;
  let fixture: ComponentFixture<ProcurementCommitteeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementCommitteeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementCommitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
