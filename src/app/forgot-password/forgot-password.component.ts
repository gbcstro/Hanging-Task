import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    public dialog: MatDialogRef<ForgotPasswordComponent>,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {

  }

  submit(){
    const email = this.emailForm.value;

    if(!this.emailForm.valid || !email){
      return;
    }
    
    this.auth.requestResetPass(email);
    this.dialog.close();
  }

}
