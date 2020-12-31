import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  public avail: boolean = false;
  public msg: string = "";
  private baseUri: string = "http://localhost:3000";
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private router: Router) { }

  register(body: any) {
    return this.http.post('http://127.0.0.1:3000/register', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  login(body: any) {
    return this.http.post('http://127.0.0.1:3000/login', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    localStorage.removeItem('admin');
    localStorage.removeItem('user');
    this.router.navigate(['/'])
  }

  check() {
    return this.http.get(this.baseUri + "/check", { headers: this.headers });
  }
}
