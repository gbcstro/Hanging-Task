import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmailVerifyComponent } from './email-verify/email-verify.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthGuard } from './services/guard/auth.guard';
import { LoginGuard } from './services/guard/login.guard';
import { ConfirmEmailGuard } from './services/guard/confirm-email.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    pathMatch: 'full',
    canActivate: [LoginGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'email/verify',
    component:EmailVerifyComponent,
    canActivate: [ConfirmEmailGuard]
  },
  {
    path: 'email/password/reset',
    component:ResetPasswordComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
