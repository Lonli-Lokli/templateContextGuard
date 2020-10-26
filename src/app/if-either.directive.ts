import { Directive, EmbeddedViewRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Either } from './either';

export interface IfContext<T> {
    $implicit: T;
    ifTrue: boolean;
}

export const initialIfContext = <T>(): IfContext<T | null> => ({
    $implicit: null,
    ifTrue: false,
});

export interface Refs<T> {
    viewContainer: ViewContainerRef;
    thenTemplateRef: TemplateRef<IfContext<T>> | null;
    elseTemplateRef: TemplateRef<IfContext<T>> | null;
    thenViewRef: EmbeddedViewRef<IfContext<T>> | null;
    elseViewRef: EmbeddedViewRef<IfContext<T>> | null;
}
export const initialRefs = <T>(): Refs<T> => ({
    viewContainer: null,
    thenTemplateRef: null,
    elseTemplateRef: null,
    thenViewRef: null,
    elseViewRef: null,
});

export function updateView<T>(context: IfContext<T>, refs: Refs<T>) {
    if (context.ifTrue) {
        if (!refs.thenViewRef) {
            refs.viewContainer.clear();
            refs.elseViewRef = null;
            if (refs.thenTemplateRef) {
                refs.thenViewRef = refs.viewContainer.createEmbeddedView(refs.thenTemplateRef, context);
            }
        }
    } else {
        if (!refs.elseViewRef) {
            refs.viewContainer.clear();
            refs.thenViewRef = null;
            if (refs.elseTemplateRef) {
                refs.elseViewRef = refs.viewContainer.createEmbeddedView(refs.elseTemplateRef, context);
            }
        }
    }
}
@Directive({ selector: '[ifRight]' })
export class IfRightDirective<TL = any, TR = any> {

    constructor(viewContainer: ViewContainerRef, templateRef: TemplateRef<IfContext<TL|TR>>) {
        this.refs.viewContainer = viewContainer;
        this.refs.thenTemplateRef = templateRef;
    }

    @Input()
    set ifRight(either: Either<TL, TR>) {
        if (either.isRight()) {
            this.context.ifTrue = true;
            this.context.$implicit = either.value;
        } else {
            this.context.ifTrue = false;
            this.context.$implicit = either.value;
        }
        updateView(this.context, this.refs);
    }

    @Input()
    set ifRightThen(templateRef: TemplateRef<IfContext<TL|TR>> | null) {
        this.refs.thenTemplateRef = templateRef;
        this.refs.thenViewRef = null;
        updateView(this.context, this.refs);
    }

    @Input()
    set ifRightElse(templateRef: TemplateRef<IfContext<TL|TR>> | null) {
        this.refs.elseTemplateRef = templateRef;
        this.refs.elseViewRef = null;
        updateView(this.context, this.refs);
    }


    // tslint:disable-next-line: variable-name
    static ngTemplateGuard_ifRight: 'binding';
    private context = initialIfContext();

    private refs = initialRefs();

    static ngTemplateContextGuard<TL, TR>(dir: IfRightDirective<TL, TR>, ctx: unknown): ctx is IfContext<TR> { return true; }
}