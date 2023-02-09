import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

}
