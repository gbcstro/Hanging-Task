import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.css']
})
export class EmailVerifyComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  token: any;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      this.token = params['token']
    });

    console.log(this.token);
    const tokenObj = {
      token: this.token
    }

    this.auth.confirmEmail(tokenObj);
    this.router.navigate(['dashboard']);

  }

}
