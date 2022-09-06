
import { HomeComponent } from './home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginService } from './login.service';

const routes: Routes = [
  {
    path:'home', component:HomeComponent
  },
  { path: 'live', loadChildren: () => import('./livestream/livestream.module').then(m => m.LivestreamModule) , canActivate: [LoginService] },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'videos', loadChildren: () => import('./videos/videos.module').then(m => m.VideosModule), canActivate: [LoginService]  },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
