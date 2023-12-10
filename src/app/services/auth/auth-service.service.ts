import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  readonly apiURL!: string;
  constructor(private http: HttpClient) {
    this.apiURL = `${environment.apiURL}`;
   }

  login(form:any) {
    return this.http.post<any>(this.apiURL + '/users/login/',form);
  }

  signUp(form:any) {
    return this.http.post<any>(this.apiURL + '/users',form)
  }

  getUrl(){
    return this.http.get<any>(this.apiURL + '/url-shortener')
  }

  addUrl(data:any) {
    return this.http.post<any>(this.apiURL + '/url-shortener',data);
  }
}
