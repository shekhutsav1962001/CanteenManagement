import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { data } from 'src/app/secret'
@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {

  public orders: any[];
  public errorMessage: any;
  public styl: any;
  public empty: any = false;
  public userid: any;
  public loading: any = true;
  public paymentAry: any = [];
  constructor(private authService: AuthService, private router: Router, private webSocketService: WebsocketService, private userService: UserService, private http: HttpClient) { }

  ngOnInit(): void {
    this.userid = localStorage.getItem('userid');
    this.check()
    this.getOrder();
    this.loading = true
    this.webSocketService.listen(this.userid).subscribe(
      (data) => {
        this.getOrder();

        this.setMessage("Order status updated!!", "green");
      }
    )
    this.webSocketService.listen('orderdelete').subscribe(
      (data) => {
        this.getOrder();

      }
    )
  }
  vieworder(item) {
    //console.log("view order");
    this.userService.setOrderid(item._id);
    this.router.navigate(['/vieworder'])
  }


  check() {
    this.authService.check().subscribe(
      data => {
        //console.log(data);
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          this.authService.logoutUser();
          this.router.navigate(['/error'])
        }
        //console.log(error);
      }
    )
  }

  setMessage(msg: any, color: any) {
    this.errorMessage = msg;
    this.styl = {
      backgroundColor: color,
    }
    setTimeout(() => {
      this.errorMessage = null;
    }, 4000);
  }


  getOrder() {
    this.userService.getAllOrder().subscribe(
      data => {
        if (data['msg']) {
          this.loading = false
          this.orders = data['msg'];
          // console.log(this.orders);
          if (this.orders.length == 0) {
            this.empty = true;
          }
          else {
            for (let index = 0; index < this.orders.length; index++) {
              const element = this.orders[index];
              if (element.paymentstatus == "paid") {
                this.paymentAry.push(true)
              }
              else {
                this.paymentAry.push(false)
              }
            }
            // console.log(this.paymentAry);
          }
          // //console.log(this.orders);
        }
        if (data['errormsg']) {
          this.setMessage(data['errormsg'], "#f04747");
        }
      },
      (error) => {

        if (error instanceof HttpErrorResponse) {
          this.authService.logoutUser();
          this.router.navigate(['/error'])
        }
        //console.log(error);
      }
    )
  }
  paytm = {
    MID: data.MID,
    WEBSITE: data.WEBSITE,
    INDUSTRY_TYPE_ID: data.INDUSTRY_TYPE_ID,
    CHANNEL_ID: data.CHANNEL_ID,
    CALLBACK_URL: data.CALLBACK_URL
  };


  makepayment(item) {
    this.loading = true
    this.paytm['CUST_ID'] = item.userid
    this.paytm['MOBILE_NO'] = item.contact
    this.paytm['EMAIL'] = item.useremail
    this.paytm['ORDER_ID'] = item._id
    this.paytm['TXN_AMOUNT'] = item.total.toString()

    // console.log(localStorage.getItem('token'));
    this.submitForm()
  }



  submitForm() {

    this.http.post(data.PAYMENT_URL, this.paytm)
      .subscribe((res: any) => {
        // As per my backend i will get checksumhash under res.data

        this.paytm['CHECKSUMHASH'] = res.data;
        this.paytm['ORDER_ID'] = res.oid

        // than i will create form
        this.createPaytmForm();
      });
  }

  createPaytmForm() {

    const my_form: any = document.createElement('form');
    my_form.name = 'paytm_form';
    my_form.method = 'post';
    my_form.action = 'https://securegw-stage.paytm.in/order/process';

    const myParams = Object.keys(this.paytm);
    for (let i = 0; i < myParams.length; i++) {
      const key = myParams[i];
      let my_tb: any = document.createElement('input');
      my_tb.type = 'hidden';
      my_tb.name = key;
      my_tb.value = this.paytm[key];
      my_form.appendChild(my_tb);
    };

    document.body.appendChild(my_form);
    my_form.submit();
    // after click will fire you will redirect to paytm payment page.
    // after complete or fail transaction you will redirect to your CALLBACK URL
  };
}
