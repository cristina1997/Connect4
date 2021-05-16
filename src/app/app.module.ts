import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponentComponent } from './game-component/game-component.component';
import { MenuComponentComponent } from './menu-component/menu-component.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponentComponent,
    MenuComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
