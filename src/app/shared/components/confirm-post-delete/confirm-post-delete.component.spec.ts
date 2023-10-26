import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPostDeleteComponent } from './confirm-post-delete.component';

describe('ConfirmPostDeleteComponent', () => {
  let component: ConfirmPostDeleteComponent;
  let fixture: ComponentFixture<ConfirmPostDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmPostDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmPostDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
