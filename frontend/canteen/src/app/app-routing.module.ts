import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './admin/admin.guard';
import { AdminhomeComponent } from './admin/adminhome/adminhome.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { LoginregisterComponent } from './auth/loginregister/loginregister.component';
import { ResetPasswordDoneComponent } from './auth/reset-password-done/reset-password-done.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ResetComponent } from './auth/reset/reset.component';
import { NotfoundComponent } from './error/notfound/notfound.component';
import { ServererrorComponent } from './error/servererror/servererror.component';
import { MainComponent } from './index/main/main.component';
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
  { path: 'change-password', component: ChangePasswordComponent,canActivate: [UserGuard] },

  // admin
  { path: 'admin/adminhome', component: AdminhomeComponent, canActivate: [AdminGuard] },

  // user
  { path: 'userhome', component: UserhomeComponent, canActivate: [UserGuard] },


  // error
  { path: 'error', component: ServererrorComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
