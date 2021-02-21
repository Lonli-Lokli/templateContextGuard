import { Component } from '@angular/core';
import { Either, left, right } from '@sweet-monads/either';
import { Observable, of } from 'rxjs';
import { mergeMap, delay, takeUntil, startWith } from 'rxjs/operators';

export interface Person {
  name: string;
}

export interface Err {
  message: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  state$: Observable<Either<Err, Person>> = of(right<Error, Person>({name: 'Lonli-Lokli'})).pipe(
    delay(3000),
    startWith(
      left<Err, Person>({message: 'emulation'})
    )
  );

}
