import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './admin/admin.guard';
import { AdminhomeComponent } from './admin/adminhome/adminhome.component';
import { LoginregisterComponent } from './auth/loginregister/loginregister.component';
import { NotfoundComponent } from './error/notfound/notfound.component';
import { ServererrorComponent } from './error/servererror/servererror.component';
import { MainComponent } from './index/main/main.component';
import { UserGuard } from './user/user.guard';
import { UserhomeComponent } from './user/userhome/userhome.component';

const routes: Routes = [

  { path: '', component: MainComponent },
  { path: 'login-register', component: LoginregisterComponent },

  { path: 'admin/adminhome', component: AdminhomeComponent, canActivate: [AdminGuard] },

  { path: 'userhome', component: UserhomeComponent, canActivate: [UserGuard] },

  { path: 'error', component: ServererrorComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
