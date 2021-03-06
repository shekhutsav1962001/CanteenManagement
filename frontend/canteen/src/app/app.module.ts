import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from "@angular/common";
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
import { AdminhomeComponent } from './admin/adminhome/adminhome.component';
import { UserhomeComponent } from './user/userhome/userhome.component';
import { LoginregisterComponent } from './auth/loginregister/loginregister.component';
import { AdminGuard } from './admin/admin.guard';
import { UserGuard } from './user/user.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ServererrorComponent } from './error/servererror/servererror.component';
import { ResetComponent } from './auth/reset/reset.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ResetPasswordDoneComponent } from './auth/reset-password-done/reset-password-done.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { UserNavComponent } from './user/user-nav/user-nav.component';
import { AddfoodComponent } from './admin/addfood/addfood.component';
import { SeefoodComponent } from './admin/seefood/seefood.component';
import { EditfoodComponent } from './admin/editfood/editfood.component';
import { AddfoodqtyComponent } from './admin/addfoodqty/addfoodqty.component';
import { AuthGuard } from './auth/auth.guard';
import { MyprofileComponent } from './user/myprofile/myprofile.component';
import { EditprofileComponent } from './user/editprofile/editprofile.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { CartComponent } from './user/cart/cart.component';
import { EmptycartComponent } from './user/emptycart/emptycart.component';
import { ViewCustomersComponent } from './admin/view-customers/view-customers.component';
import { OneorderviewComponent } from './admin/oneorderview/oneorderview.component';
import { OneuserviewComponent } from './admin/oneuserview/oneuserview.component';
import { MyordersComponent } from './user/myorders/myorders.component';
import { VieworderComponent } from './user/vieworder/vieworder.component';
import { ViewfeedbackComponent } from './admin/viewfeedback/viewfeedback.component';
import { VieworderhistoryComponent } from './admin/vieworderhistory/vieworderhistory.component';
import { FeedbackComponent } from './user/feedback/feedback.component';
import { QrcodeComponent } from './admin/qrcode/qrcode.component';
import { LoadingComponent } from './loading/loading/loading.component';
// ***

@NgModule({
  declarations: [
    AppComponent,
    IndexnavbarComponent,
    MainComponent,
    NotfoundComponent,
    FoodComponent,
    ChefsComponent,
    HeaderComponent,
    AdminhomeComponent,
    UserhomeComponent,
    LoginregisterComponent,
    ServererrorComponent,
    ResetComponent,
    ResetPasswordComponent,
    ResetPasswordDoneComponent,
    ChangePasswordComponent,
    AdminNavComponent,
    UserNavComponent,
    AddfoodComponent,
    SeefoodComponent,
    EditfoodComponent,
    AddfoodqtyComponent,
    MyprofileComponent,
    EditprofileComponent,
    MessageBoxComponent,
    CartComponent,
    EmptycartComponent,
    ViewCustomersComponent,
    OneorderviewComponent,
    OneuserviewComponent,
    MyordersComponent,
    VieworderComponent,
    ViewfeedbackComponent,
    VieworderhistoryComponent,
    FeedbackComponent,
    QrcodeComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule, // required animations  module
    ToastrModule.forRoot(),
  ],
  providers: [AdminGuard,UserGuard,AuthGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
