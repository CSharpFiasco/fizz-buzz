import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { FizzBuzzResponse, FizzBuzzService } from '../services/fizz-buzz.service';
import { tap } from 'rxjs';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatInputModule, ReactiveFormsModule, MatToolbarModule, MatButtonModule, MatIconModule, KeyValuePipe, MatListModule],
  providers: [FizzBuzzService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected readonly title = 'fizz-buzz';

  private readonly fizzBuzzService: FizzBuzzService = inject(FizzBuzzService);

  protected fizzBuzzResponse: FizzBuzzResponse = {};

  protected readonly formGroup = new FormGroup({
    multiples: new FormArray<FormGroup<{ multiple: FormControl<number>, wordToPrint: FormControl<string> }>>([
      new FormGroup({
        multiple: new FormControl<number>(3, {nonNullable: true}),
        wordToPrint: new FormControl<string>('Fizz', {nonNullable: true}),
      }),
      new FormGroup({
        multiple: new FormControl<number>(5, {nonNullable: true}),
        wordToPrint: new FormControl<string>('Buzz', {nonNullable: true}),
      }),
    ]),
    maxNumber: new FormControl<number>(100, {nonNullable: true}),
  })

  protected onAdd() {
    this.formGroup.controls.multiples.push(
      new FormGroup({
        multiple: new FormControl<number>(0, {nonNullable: true}),
        wordToPrint: new FormControl<string>('', {nonNullable: true}),
      })
    );
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

}
