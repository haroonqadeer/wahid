import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TryMenuPageComponent } from './try-menu-page.component';

describe('TryMenuPageComponent', () => {
  let component: TryMenuPageComponent;
  let fixture: ComponentFixture<TryMenuPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TryMenuPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TryMenuPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
