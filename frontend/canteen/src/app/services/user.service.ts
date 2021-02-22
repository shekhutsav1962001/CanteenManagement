import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public avail: boolean = false;
  public msg: string = "";
  public orderid:any;
  private baseUri: string = environment.heroku ? "https://appcanteen.herokuapp.com/user/" : "http://localhost:3000/user/";
  // private baseUri: string = "http://localhost:3000/user/";
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private router: Router) { }

  myprofile() {
    return this.http.get(this.baseUri + "myprofile", { headers: this.headers });
  }

  editprofile(body: any) {
    return this.http.post(this.baseUri + "editprofile", body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  getAllFood() {
    return this.http.get(this.baseUri + "getallfooditem", { headers: this.headers });
  }

  addtocart(body: any) {
    return this.http.post(this.baseUri + "addtocart", body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  getCount()
  {
    return this.http.get(this.baseUri + "getcount", { headers: this.headers });
  }

  getcart()
  {
    return this.http.get(this.baseUri + "getcart", { headers: this.headers });
  }

  deleteFromCart(body: any)
  {
    return this.http.post(this.baseUri + "deletefromcart", body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }


  paytm(body: any) {
    return this.http.post(this.baseUri+"paytm", body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }


  placeOrder(body: any) {
    return this.http.post(this.baseUri+"placeorder", body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }


  getAllOrder() {
    return this.http.get(this.baseUri + "getalluserorders", { headers: this.headers });
  }

  setOrderid(id)
  {
    this.orderid = id;
  }

  getOrderid()
  {
    return this.orderid;
  }

  getOneOrder(id)
  {
    return this.http.get(this.baseUri + "getoneorder/" + id, { headers: this.headers });
  }

  feedback(body: any) {
    return this.http.post(this.baseUri + "sendfeedback", body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}
