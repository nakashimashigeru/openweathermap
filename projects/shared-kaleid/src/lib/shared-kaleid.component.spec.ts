import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SharedKaleidComponent } from './shared-kaleid.component';

describe('SharedKaleidComponent', () => {
  let component: SharedKaleidComponent;
  let fixture: ComponentFixture<SharedKaleidComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedKaleidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedKaleidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
