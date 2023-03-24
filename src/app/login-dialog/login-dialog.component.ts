import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required])
  });

  constructor(
    private auth: AuthService,
    private dialog: MatDialogRef<LoginDialogComponent>,
    private matDialog: MatDialog,
  ) { }

  onNoClick(): void {
    this.dialog.close();
  }

  ngOnInit(): void {

  }

  forgotPassword(){
    let email = this.email;

    this.dialog.close();
    return this.matDialog.open(ForgotPasswordComponent,{
      disableClose: true,
      data: email,
      position: {top:'20vh'},
    });
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submit(){

    const { email, password } = this.loginForm.value;
    
    if(!this.loginForm.valid){
      return;
    }

    const loginObj = {
      email: email,
      password: password
    };

    this.auth.login(loginObj);
    this.dialog.close();
  }

}
