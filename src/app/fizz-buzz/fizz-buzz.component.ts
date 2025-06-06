import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validator, ValidatorFn } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { FizzBuzzResponse, FizzBuzzService } from '../../services/fizz-buzz.service';
import { tap } from 'rxjs';
import { KeyValue, KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-fizz-buzz',
  imports: [MatInputModule, ReactiveFormsModule, MatButtonModule, MatIconModule, KeyValuePipe, MatListModule],
  providers: [FizzBuzzService],
  templateUrl: './fizz-buzz.component.html',
  styleUrl: './fizz-buzz.component.scss'
})
export class FizzBuzzComponent {

  private readonly fizzBuzzService: FizzBuzzService = inject(FizzBuzzService);

  protected fizzBuzzResponse: FizzBuzzResponse = {};

  protected readonly formGroup = new FormGroup({
    multiples: new FormArray<FormGroup<{ multiple: FormControl<number>, wordToPrint: FormControl<string> }>>([
      new FormGroup({
        multiple: new FormControl<number>(3, {nonNullable: true, validators: [this.getDuplicatesValidator()]}),
        wordToPrint: new FormControl<string>('Fizz', {nonNullable: true}),
      }),
      new FormGroup({
        multiple: new FormControl<number>(5, {nonNullable: true, validators: [this.getDuplicatesValidator()]}),
        wordToPrint: new FormControl<string>('Buzz', {nonNullable: true}),
      }),
    ], {
      validators: this.getMultiplesValidator(),
    }),
    maxNumber: new FormControl<number>(100, {nonNullable: true}),
  })

  protected onAdd() {
    const toAdd = new FormGroup({
        multiple: new FormControl<number>(6, {nonNullable: true, validators: [this.getDuplicatesValidator()]}),
        wordToPrint: new FormControl<string>('Bazz', {nonNullable: true}),
      });
    toAdd.markAllAsTouched();
    this.formGroup.controls.multiples.push(toAdd);
  }

  protected onRemove(group: FormGroup<any>) {
    this.formGroup.controls.multiples.removeAt(this.formGroup.controls.multiples.controls.indexOf(group));
  }

  protected onSubmit() {
    const multiples = this.formGroup.controls.multiples.controls.map((group) => {
      return {
        multiple: group.controls.multiple.value,
        wordToPrint: group.controls.wordToPrint.value,
      }
    });

    const maxNumber = this.formGroup.controls.maxNumber.value;

    this.fizzBuzzService.getFizzBuzz({ multiples, maxNumber })
    .pipe(tap((response) => {
      this.fizzBuzzResponse = response;
    }))
    .subscribe();
  }

  private getMultiplesValidator(): ValidatorFn {
    const validator: ValidatorFn = (formArray: AbstractControl) => {
      if (!(formArray instanceof FormArray)) {
        return null;
      }

      const typedArray = formArray as FormArray<FormGroup<{ multiple: FormControl<number>, wordToPrint: FormControl<string> }>>;

      if (typedArray.controls.length <= 1) {
        return { required: true };
      }

      return null;
    }

    return validator;
  }

  private getDuplicatesValidator(): ValidatorFn {
    const validator: ValidatorFn = (formControl: AbstractControl) => {
      if (!(formControl instanceof FormControl) || !this.formGroup) {
        return null;
      }

      const typedControl = formControl as FormControl<number>;

      const multiples = typedControl.value;

      const duplicates = this.formGroup.controls.multiples.controls.map(c => c.controls.multiple).filter((group) => {
        if (group === typedControl) {
          return false;
        }

        const groupMultiples = group.value;

        return multiples === groupMultiples;
      });

      if (duplicates.length > 0) {
        return { duplicates: true };
      }

      return null;
    }

    return validator;
  }

  protected sortByKeyAsNumber<K, V>(a: KeyValue<K, V>, b: KeyValue<K, V>): number {
    const aKey = Number(a.key);
    const bKey = Number(b.key);

    if (isNaN(aKey) || isNaN(bKey)) {
      return 0; // or handle as needed
    }

    return aKey - bKey;
  }

  protected trackByKeyValue<K extends string, V extends string>(index: number, item: KeyValue<K, V>): string {
    return item.key + item.value;
  }

  protected trackByReference(index: number, item: FormGroup<any>): FormGroup<any> {
    return item;
  }

}
