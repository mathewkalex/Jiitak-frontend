import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder,Validators,UntypedFormGroup,ReactiveFormsModule,FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../services/auth/auth-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  constructor(
    private _router: Router,
    private _forms: UntypedFormBuilder,
    private loginService: AuthServiceService
  ){}

  ngOnInit(): void {
    this.loginForm = this._forms.group({
      userName: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  login() {
    this.loginService.login(this.loginForm.value).subscribe(res => {
      if(res.status == 'success') {
        sessionStorage.setItem('token',res.token);
        this._router.navigate(['url-shortener']);
      }
    })
  }

}
