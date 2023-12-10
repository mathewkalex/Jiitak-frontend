import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs'
import { inject } from '@angular/core'
import { ErrorServiceService } from '../services/error/error-service.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toaster = inject(ErrorServiceService)
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if(error.status === 401) {
        toaster.errorLogOut();
      }
      toaster.errorToaster(error?.error);
      return throwError(() => error);
    })
  );
};
