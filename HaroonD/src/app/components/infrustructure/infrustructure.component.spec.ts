import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfrustructureComponent } from './infrustructure.component';

describe('InfrustructureComponent', () => {
  let component: InfrustructureComponent;
  let fixture: ComponentFixture<InfrustructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfrustructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfrustructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
