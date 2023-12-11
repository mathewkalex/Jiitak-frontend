import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth/auth-service.service';
import { UntypedFormBuilder, Validators, UntypedFormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ErrorServiceService } from '../services/error/error-service.service';

@Component({
  selector: 'app-url-shortener',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './url-shortener.component.html',
  styleUrl: './url-shortener.component.css'
})
export class UrlShortenerComponent implements OnInit {
  allUrl: any = [];
  urlForm!: UntypedFormGroup;
  constructor(
    private urlService: AuthServiceService,
    private _forms: UntypedFormBuilder,
    private _router: Router,
    private toaster: ErrorServiceService
  ) { }

  ngOnInit(): void {
    this.urlService.getUrl().subscribe(res => {
      if (res.status == 'success') {
        this.allUrl = res.urls;
      }
    });
    this.urlForm = this._forms.group({
      longUrl: ['',Validators.required]
    });
  }

  addUrl() {
    if (this.urlForm.valid) {
      this.urlService.addUrl(this.urlForm.value).subscribe(res => {
        if(res.status == 'success') {
          this.allUrl.push(res.newUrls);
          this.toaster.successToaster('URL added');
          this.urlForm.controls['longUrl'].reset();
        }
      })
    }
  }

  logout() {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }

}
