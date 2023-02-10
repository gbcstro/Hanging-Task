import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
  ) { }

  onNoClick(): void {
    this.dialog.close();
  }

  ngOnInit(): void {
  }

  get email(){
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password');
  }

  submit(){

    const { email, password } = this.loginForm.value;
    
    if(!this.loginForm.valid || !email || !password){
      return;
    }
    
    this.auth.SignIn(email, password);
    this.dialog.close();
  }

}
