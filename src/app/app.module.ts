import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IfRightDirective } from './if-either.directive';
import { TemplateContextImplicitDirective } from './template-context.directive';
import { AsCtxPipe } from './asCtx.pipe';

@NgModule({
  declarations: [
    AppComponent, IfRightDirective, TemplateContextImplicitDirective, AsCtxPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
