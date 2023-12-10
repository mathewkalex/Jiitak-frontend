import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { UntypedFormBuilder,Validators,UntypedFormGroup,ReactiveFormsModule,FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth/auth-service.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {
  userForm!: UntypedFormGroup;
  constructor(
    private _router: Router,
    private _forms: UntypedFormBuilder,
    private signupService: AuthServiceService
  ){}
  ngOnInit(): void {
    this.userForm = this._forms.group({
      firstName: ['',Validators.required],
      lastName: [''],
      userName:['',Validators.required],
      password: ['',Validators.required]
    });
  }

  signup(){
    this.signupService.signUp(this.userForm.value).subscribe(res => {
        if(res.status == 'success'){
          sessionStorage.setItem('token',res.token);
          this._router.navigate(['url-shortener']);
        }
    })
  }

}
