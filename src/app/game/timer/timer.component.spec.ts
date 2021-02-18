import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerComponent } from './timer.component';

describe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should provide the seconds as a 2 digit number', () => {
    // test single digit seconds
    component.elapsedSeconds = 2;
    expect(component.getFormattedElapsedSeconds()).toBe('02');

    // test 2 digits seconds
    component.elapsedSeconds = 22;
    expect(component.getFormattedElapsedSeconds()).toBe('22');
  });

  it('should provide the minutes as intger number', () => {
    // test less than a minute
    component.elapsedSeconds = 2;
    expect(component.getFormattedElapsedMinutes()).toBe('0');

    // test above a minute
    component.elapsedSeconds = 62;
    expect(component.getFormattedElapsedMinutes()).toBe('1');
  });

  it('should split elapsed time in minutes and seconds parts', () => {
    // test less than a minute
    component.elapsedSeconds = 2;
    expect(component.getFormattedElapsedSeconds()).toBe('02');
    expect(component.getFormattedElapsedMinutes()).toBe('0');

    // test above a minute
    component.elapsedSeconds = 62;
    expect(component.getFormattedElapsedSeconds()).toBe('02');
    expect(component.getFormattedElapsedMinutes()).toBe('1');
  });
});
