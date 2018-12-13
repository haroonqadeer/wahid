import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersMonitoringComponent } from './orders-monitoring.component';

describe('OrdersMonitoringComponent', () => {
  let component: OrdersMonitoringComponent;
  let fixture: ComponentFixture<OrdersMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
