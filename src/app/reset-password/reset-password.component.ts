import { Component, OnInit } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    confPassword: new FormControl('', [Validators.required]),
  }, {
    validators:passMatchValidator()
  });

  token: any;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      const token = new String(params['token']); 
      if(token.length !== 40){ 
        this.router.navigate(['']);       
      } else {
        this.token = params['token'];
      }
    });

  }

  submit(){
    const {password, confPassword} = this.resetForm.value;
    if(!this.resetForm.valid || !password || !confPassword){
      return;
    }

    const params = {
      token: this.token,
      password: password
    }

    this.auth.resetPassword(params);
  }



}
