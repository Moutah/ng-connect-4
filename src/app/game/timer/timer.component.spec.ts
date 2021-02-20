import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerComponent } from './timer.component';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO : Make this test synchronous by leveraging fakeAsync
  it('counts time only when given truthy isRunning prop', async () => {
    component.isRunning = true;
    fixture.detectChanges();

    // validate initial elapsed seconds
    expect(component.elapsedSeconds).toBe(0);

    // wait a tick
    await sleep(1200);
    fixture.detectChanges();
    expect(component.elapsedSeconds).toBe(1);

    // elapsed seconds stops incrementing when isRunning is false
    component.isRunning = false;
    await sleep(1200);
    fixture.detectChanges();
    expect(component.elapsedSeconds).toBe(1);
  });

  it('provides the seconds as a 2 digit number', () => {
    // test single digit seconds
    component.elapsedSeconds = 2;
    expect(component.getFormattedElapsedSeconds()).toBe('02');

    // test 2 digits seconds
    component.elapsedSeconds = 22;
    expect(component.getFormattedElapsedSeconds()).toBe('22');
  });

  it('provides the minutes as integer number', () => {
    // test less than a minute
    component.elapsedSeconds = 2;
    expect(component.getFormattedElapsedMinutes()).toBe('0');

    // test above a minute
    component.elapsedSeconds = 62;
    expect(component.getFormattedElapsedMinutes()).toBe('1');
  });

  it('splits elapsed time in minutes and seconds parts', () => {
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
