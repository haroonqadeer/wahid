import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxsectionComponent } from './taxsection.component';

describe('TaxsectionComponent', () => {
  let component: TaxsectionComponent;
  let fixture: ComponentFixture<TaxsectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxsectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
