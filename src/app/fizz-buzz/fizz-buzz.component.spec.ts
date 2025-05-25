import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FizzBuzzComponent } from './fizz-buzz.component';
import { FizzBuzzService } from '../../services/fizz-buzz.service';
import { of } from 'rxjs';

describe('FizzBuzzComponent', () => {
  let component: FizzBuzzComponent;
  let fixture: ComponentFixture<FizzBuzzComponent>;
  let fizzBuzzServiceSpy: jasmine.SpyObj<FizzBuzzService>;

  beforeEach(async () => {
    fizzBuzzServiceSpy = jasmine.createSpyObj('FizzBuzzService', ['getFizzBuzz']);

    await TestBed.configureTestingModule({
      imports: [FizzBuzzComponent],
    })
    .overrideProvider(FizzBuzzService, { useValue: fizzBuzzServiceSpy })
    .compileComponents();

    fixture = TestBed.createComponent(FizzBuzzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call FizzBuzzService on submit', () => {
    const defaultMultiple1 = 3;
    const defaultWord1 = 'Fizz';
    const defaultMultiple2 = 5;
    const defaultWord2 = 'Buzz';

    fizzBuzzServiceSpy.getFizzBuzz.and.returnValue(of({1: 'FizzBuzz'}));

    fixture.nativeElement.querySelector('[data-testid="submit-button"').click();

    expect(fizzBuzzServiceSpy.getFizzBuzz).toHaveBeenCalledWith({
      maxNumber: 100,
      multiples: [
        { multiple: defaultMultiple1, wordToPrint: defaultWord1 },
        { multiple: defaultMultiple2, wordToPrint: defaultWord2 }
      ]
    });
  });
});
