import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
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
    const {firstName, lastName, email, password} = this.signInForm.value;

    if(!this.signInForm.valid || !email || !password || !lastName || !firstName) { 
      return ; 
    }

    const sigIn = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password
    };

    this.auth.register(sigIn);
    
    this.dialogRef.close();
  }

}
