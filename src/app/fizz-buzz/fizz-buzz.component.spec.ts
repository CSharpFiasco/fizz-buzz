import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FizzBuzzComponent } from './fizz-buzz.component';
import { FizzBuzzService } from '../../services/fizz-buzz.service';

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
});
