import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DAreaWiseComponent } from './d-area-wise.component';

describe('DAreaWiseComponent', () => {
  let component: DAreaWiseComponent;
  let fixture: ComponentFixture<DAreaWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DAreaWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DAreaWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
