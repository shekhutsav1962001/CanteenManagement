import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddfoodComponent } from './admin/addfood/addfood.component';
import { AddfoodqtyComponent } from './admin/addfoodqty/addfoodqty.component';
import { AdminGuard } from './admin/admin.guard';
import { AdminhomeComponent } from './admin/adminhome/adminhome.component';
import { EditfoodComponent } from './admin/editfood/editfood.component';
import { SeefoodComponent } from './admin/seefood/seefood.component';
import { ViewCustomersComponent } from './admin/view-customers/view-customers.component';
import { AuthGuard } from './auth/auth.guard';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { LoginregisterComponent } from './auth/loginregister/loginregister.component';
import { ResetPasswordDoneComponent } from './auth/reset-password-done/reset-password-done.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ResetComponent } from './auth/reset/reset.component';
import { NotfoundComponent } from './error/notfound/notfound.component';
import { ServererrorComponent } from './error/servererror/servererror.component';
import { MainComponent } from './index/main/main.component';
import { CartComponent } from './user/cart/cart.component';
import { EditprofileComponent } from './user/editprofile/editprofile.component';
import { EmptycartComponent } from './user/emptycart/emptycart.component';
import { MyprofileComponent } from './user/myprofile/myprofile.component';
import { UserGuard } from './user/user.guard';
import { UserhomeComponent } from './user/userhome/userhome.component';

const routes: Routes = [
  // landing page
  { path: '', component: MainComponent },

  // login - register
  { path: 'login-register', component: LoginregisterComponent },

  // forgot password (reset passord) and change password
  { path: 'reset', component: ResetComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'reset-password-done', component: ResetPasswordDoneComponent },
  { path: 'change-password', component: ChangePasswordComponent,canActivate: [AuthGuard] },

  // admin
  { path: 'admin/adminhome', component: AdminhomeComponent, canActivate: [AdminGuard] },
  { path: 'admin/addfood', component: AddfoodComponent, canActivate: [AdminGuard] },
  { path: 'admin/seefood', component: SeefoodComponent, canActivate: [AdminGuard] },
  { path: 'admin/editfood', component: EditfoodComponent, canActivate: [AdminGuard] },
  { path: 'admin/addfoodqty', component: AddfoodqtyComponent, canActivate: [AdminGuard] },
  { path: 'admin/viewusers', component: ViewCustomersComponent, canActivate: [AdminGuard] },


  // user
  { path: 'userhome', component: UserhomeComponent, canActivate: [UserGuard] },
  { path: 'myprofile', component: MyprofileComponent, canActivate: [UserGuard] },
  { path: 'editprofile', component: EditprofileComponent, canActivate: [UserGuard] },
  { path: 'empty-cart', component:  EmptycartComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },


  // error
  { path: 'error', component: ServererrorComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
