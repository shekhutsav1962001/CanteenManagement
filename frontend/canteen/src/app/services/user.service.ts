import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public avail: boolean = false;
  public msg: string = "";
  private baseUri: string = "http://localhost:3000/user/";
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private router: Router) { }

  myprofile() {
    return this.http.get(this.baseUri + "myprofile", { headers: this.headers });
  }

  editprofile(body: any) {
    return this.http.post(this.baseUri+"editprofile", body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}
