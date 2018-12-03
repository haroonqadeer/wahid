import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementSettingComponent } from './procurement-setting.component';

describe('ProcurementSettingComponent', () => {
  let component: ProcurementSettingComponent;
  let fixture: ComponentFixture<ProcurementSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
