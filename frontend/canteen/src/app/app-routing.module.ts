import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './error/notfound/notfound.component';
import { MainComponent } from './index/main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: '**', component: NotfoundComponent   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
