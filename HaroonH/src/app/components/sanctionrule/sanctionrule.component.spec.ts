import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SanctionruleComponent } from './sanctionrule.component';

describe('SanctionruleComponent', () => {
  let component: SanctionruleComponent;
  let fixture: ComponentFixture<SanctionruleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SanctionruleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SanctionruleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
