import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { WebsocketService } from 'src/app/services/websocket.service';

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
  public loading:any= true;
  constructor(private authService: AuthService, private router: Router, private webSocketService: WebsocketService, private userService: UserService) { }

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
          if (this.orders.length == 0) {
            this.empty = true;
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
}
