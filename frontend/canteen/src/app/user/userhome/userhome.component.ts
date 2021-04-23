import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { WebsocketService } from 'src/app/services/websocket.service';
// import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

  public fooditems: any[];
  public len: any;
  public myitem: any = {};
  public errorMessage: any;
  public styl: any;
  public loading: any = true;
  constructor(private authService: AuthService, private router: Router, private userService: UserService, private webSocketService: WebsocketService) { }

  ngOnInit(): void {
    this.loading = true;
    if (this.authService.getMessage()) {
      var x = this.authService.getMessage();
      this.setMessage(x.msg, x.color)
    }
    this.check()
    this.getData()
    this.webSocketService.listen('foodcrudbyadmin').subscribe(
      (data) => {
        //console.log(data);
        this.getData();
      }
    )
    this.webSocketService.listen('cart').subscribe(
      (data) => {
        //console.log(data);
        this.getData();
      }
    )
    this.webSocketService.listen('neworderplaced').subscribe(
      (data) => {
        this.getData()
      }
    )
  }

  getData() {
    this.userService.getAllFood().subscribe(
      data => {
        if (data['msg']) {
          this.loading = false
          this.fooditems = data['msg'];
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

  addtocart(item) {
    // //console.log(environment.heroku);
    // //console.log(item);

    this.myitem._id = item._id;
    this.myitem.unlimited = item.unlimited;
    this.myitem.foodprice = item.foodprice;
    this.myitem.foodimage = item.foodimage;
    this.myitem.foodname = item.foodname;
    this.myitem.foodqty = 1;
    //console.log(this.myitem);
    this.userService.addtocart(this.myitem).subscribe(
      data => {

        //console.log(data);
        if (data['msg']) {
          this.setMessage("successfully item added to cart", "green");
        }
        if (data['errormsg']) {
          this.setMessage(data['errormsg'], "#f04747");
        }
      },
      error => {
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
}
