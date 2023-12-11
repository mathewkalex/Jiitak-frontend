import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { UntypedFormBuilder,Validators,UntypedFormGroup,ReactiveFormsModule,FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../services/auth/auth-service.service';
import { ErrorServiceService } from '../services/error/error-service.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule, RouterModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {
  userForm!: UntypedFormGroup;
  constructor(
    private _router: Router,
    private _forms: UntypedFormBuilder,
    private signupService: AuthServiceService,
    private toaster: ErrorServiceService
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
          this.toaster.successToaster('Successfully logged In')
          this._router.navigate(['url-shortener']);
        }
    })
  }

}
