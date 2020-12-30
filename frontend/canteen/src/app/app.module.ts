import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexnavbarComponent } from './index/indexnavbar/indexnavbar.component';
import { MainComponent } from './index/main/main.component';
import { FormsModule } from '@angular/forms';
// toster
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NotfoundComponent } from './error/notfound/notfound.component';
import { FoodComponent } from './index/food/food.component';
import { ChefsComponent } from './index/chefs/chefs.component';
import { HeaderComponent } from './index/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexnavbarComponent,
    MainComponent,
    NotfoundComponent,
    FoodComponent,
    ChefsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule, // required animations  module
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
