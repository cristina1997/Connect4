import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GridComponent } from './grid.component';

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
      ],
      declarations: [
        GridComponent
      ],
      providers: [
        { provide: MatDialog, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display circle', () => {
      expect(fixture.debugElement.query(By.css('.token-design')).nativeElement).not.toBeNull();
  });

  it('should change circle colour', () => {
    spyOn(component, 'calculateConnectFive');
    expect(component.nextColour).toBe('red');

    component.isClickable = true;
    component.count = 0;
    component.tokenMovement(5, 5);
    expect(component.count).toBe(1);
    expect(component.calculateConnectFive).toHaveBeenCalledWith(5, 5, 0, 'yellow', 'all');
  });

  it('should display grid', () => {
    expect(fixture.debugElement.query(By.css('.grid-tile')).nativeElement).not.toBeNull();
  });

  it('should calculate the connect five win ', () => {
    let i = 0;
    expect(component.calculateConnectFive(i, i, i, 'red', 'E')).toBeFalse();
    for (i; i < 5; i++){ }
    expect(component.calculateConnectFive(i, i, i, 'red', 'E')).toBeTrue();

  })

});
