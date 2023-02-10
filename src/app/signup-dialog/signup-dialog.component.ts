import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { AuthService } from '../services/auth.service';

export function passMatchValidator(): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {
    const pass = control.get('password')?.value;
    const confPass = control.get('confPassword')?.value;

    if (pass && confPass && pass !== confPass){
      return {
        passwordsDontMatch: true
      }
    }

    return null;

  };
}

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.css']
})

export class SignupDialogComponent implements OnInit {

  signInForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
    confPassword: new FormControl('', [Validators.required]),
  }, {
    validators:passMatchValidator()
  });

  constructor(
    private auth: AuthService,
    public dialogRef: MatDialogRef<SignupDialogComponent>,
  ) { }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }

  get confPassword() {
    return this.signInForm.get('confPassword')
  }

  submit(){
    const {email , password} = this.signInForm.value;

    if(!this.signInForm.valid || !email || !password) { 
      return ; 
    }
    
    this.auth.SignUp(email, password);

    this.dialogRef.close()
  }

}
