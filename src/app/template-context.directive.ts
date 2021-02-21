import { Directive, Input } from '@angular/core';

type ImplicitContext<T> = { $implicit: T; [index: string]: any };

@Directive({
  selector: '[appTemplateContextImplicit]',
})
export class TemplateContextImplicitDirective<T> {
  @Input()
  appTemplateContextImplicit?: T;

  constructor() {}

  static ngTemplateContextGuard<T>(
    dir: TemplateContextImplicitDirective<T>,
    ctx: unknown
  ): ctx is ImplicitContext<T> {
    return true;
  }
}