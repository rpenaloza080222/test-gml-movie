import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorHttpHandlerComponent } from './error-http-handler.component';

describe('ErrorHttpHandlerComponent', () => {
  let component: ErrorHttpHandlerComponent;
  let fixture: ComponentFixture<ErrorHttpHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorHttpHandlerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorHttpHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
