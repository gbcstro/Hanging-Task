import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { AuthService } from '../services/auth.service';
import { SignupDialogComponent } from '../signup-dialog/signup-dialog.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {

  }

  loginDialog(){
    this.dialog.open(LoginDialogComponent,{
      height: 'auto',
      
    });
  }

  signInDialog(){
    this.dialog.open(SignupDialogComponent, {
      height: 'auto',

    })
  }

}
