import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asCtx'
})
export class AsCtxPipe implements PipeTransform {
  transform<T>(input: T) {
    return {
        $implicit: input
    };
  }
}