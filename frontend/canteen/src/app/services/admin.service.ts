import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public avail: boolean = false;
  public msg: string = "";
  public orderid:any;
  public userid:any;
  private food: any;
  public qrcode:any;
  private baseUri: string = environment.heroku ? "https://appcanteen.herokuapp.com/admin/" : "http://localhost:3000/admin/";
  // private baseUri: string = "http://localhost:3000/admin/";
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private router: Router) { }

  addfood(body: any) {
    return this.http.post(this.baseUri + "addfood", body);
  }

  getAllFood() {
    return this.http.get(this.baseUri + "getallfooditem", { headers: this.headers });
  }

  setFood(item) {
    this.food = item;
  }

  getFood() {
    return this.food;
  }

  editfood(body: any) {
    return this.http.post(this.baseUri + "editfood", body);
  }

  editfoodwithimage(body: any) {
    return this.http.post(this.baseUri + "editfoodwithimage", body);
  }

  deleteFood(id) {
    return this.http.delete(this.baseUri + "deletefood/" + id, { headers: this.headers });
  }


  getAlluser() {
    return this.http.get(this.baseUri + "getalluser", { headers: this.headers });
  }

  blockuser(id) {
    return this.http.delete(this.baseUri + "blockuser/" + id, { headers: this.headers });
  }
  unblockuser(id) {
    return this.http.delete(this.baseUri + "unblockuser/" + id, { headers: this.headers });
  }

  getAllOrder() {
    return this.http.get(this.baseUri + "getallorders", { headers: this.headers });
  }

  updateOrderstatus(body:any) {
    return this.http.post(this.baseUri + "updateorderstatus", body);
  }

  deleteOrder(id)
  {
    return this.http.delete(this.baseUri + "deleteorder/" + id, { headers: this.headers });
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

  setUserid(id)
  {
    this.userid = id;
  }

  getUserid()
  {
    return this.userid;
  }

  getOneUser(id)
  {
    return this.http.get(this.baseUri + "getoneuser/" + id, { headers: this.headers });
  }

  getOrderHistory(date)
  {
    return this.http.get(this.baseUri + "getorderhistory/" + date, { headers: this.headers });
  }

  updatePaymentstatus(body:any)
  {
    return this.http.post(this.baseUri + "updatepaymentstatus", body);
  }

  setQrcode(id)
  {
    this.qrcode = id;
  }

  getQrcode()
  {
    return this.qrcode;
  }

  generateQrcode(id)
  {
    return this.http.get(this.baseUri + "getqrcode/" + id, { headers: this.headers });
  }


  getAllfeedback()
  {
    return this.http.get(this.baseUri + "getallfeedback", { headers: this.headers });
  }

  deleteFeedback(id)
  {
    return this.http.delete(this.baseUri + "deletefeedback/" + id, { headers: this.headers });
  }
}
