import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAnswersComponent } from './display-answers.component';

describe('DisplayAnswersComponent', () => {
  let component: DisplayAnswersComponent;
  let fixture: ComponentFixture<DisplayAnswersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayAnswersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
