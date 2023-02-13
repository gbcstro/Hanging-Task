import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthGuard } from './services/guard/auth.guard';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['landing']);

const routes: Routes = [
  {
    path: '',
    redirectTo: '/landing',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    component: LandingPageComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ AngularFireAuthGuard ],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
