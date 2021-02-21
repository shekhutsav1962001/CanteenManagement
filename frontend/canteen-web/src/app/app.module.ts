import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChefsComponent } from './index/chefs/chefs.component';
import { FoodComponent } from './index/food/food.component';
import { HeaderComponent } from './index/header/header.component';
import { IndexnavbarComponent } from './index/indexnavbar/indexnavbar.component';
import { MainComponent } from './index/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    ChefsComponent,
    FoodComponent,
    HeaderComponent,
    IndexnavbarComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
