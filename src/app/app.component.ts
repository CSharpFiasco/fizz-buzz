import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatInputModule, ReactiveFormsModule, MatToolbarModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected readonly title = 'fizz-buzz';

  protected readonly formGroup = new FormGroup({
    fizz: new FormControl<number>(3),
    buzz: new FormControl<number>(5),
    maxNumber: new FormControl<number>(100),
    fizzWordToPrint: new FormControl<string>('Fizz'),
    buzzWordToPrint: new FormControl<string>('Buzz'),
  })

  protected onSubmit() {

  }

}
