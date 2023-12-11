import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorServiceService {

  constructor(
    private toastr: ToastrService,
   private _router: Router 
    ) { }

  errorToaster(error:any){
    this.toastr.error(error?.message);
  }

  errorLogOut() {
    sessionStorage.clear();
    this._router.navigateByUrl('');
  }

  successToaster(message:string ) {
    this.toastr.success(message);
  }

}
