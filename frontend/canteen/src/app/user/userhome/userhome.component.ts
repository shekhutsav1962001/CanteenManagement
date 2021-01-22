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
  constructor(private authService: AuthService, private router: Router, private userService: UserService, private webSocketService: WebsocketService) { }

  ngOnInit(): void {
    this.check()
    this.getData()
    this.webSocketService.listen('foodcrudbyadmin').subscribe(
      (data) => {
        console.log(data);
        this.getData();
      }
    )
    this.webSocketService.listen('cart').subscribe(
      (data) => {
        console.log(data);
        this.getData();
      }
    )
  }

  getData() {
    this.userService.getAllFood().subscribe(
      data => {
        if (data['msg']) {
          this.fooditems = data['msg'];
        }
        else {
          this.authService.logoutUser();
          this.router.navigate(['/error'])
        }
      },
      (error) => {

        if (error instanceof HttpErrorResponse) {
          this.authService.logoutUser();
          this.router.navigate(['/error'])
        }
        console.log(error);
      }
    )
  }

  check() {
    this.authService.check().subscribe(
      data => {
        console.log(data);
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          this.authService.logoutUser();
          this.router.navigate(['/error'])
        }
        console.log(error);
      }
    )
  }

  addtocart(item) {
    // console.log(environment.heroku);
    // console.log(item);

    this.myitem._id = item._id;
    this.myitem.unlimited = item.unlimited;
    this.myitem.foodprice = item.foodprice;
    this.myitem.foodimage = item.foodimage;
    this.myitem.foodname = item.foodname;
    this.myitem.foodqty = 1;
    console.log(this.myitem);
    this.userService.addtocart(this.myitem).subscribe(
      data => {

        console.log(data);
        // this.toastr.success('Pizza Added to the cart', '', {
        //   timeOut: 2000,
        //   closeButton: true
        // });
      },
      error => {
        if (error instanceof HttpErrorResponse) {
          this.authService.logoutUser();
          this.router.navigate(['/error'])
        }
        console.log(error);
      }
    )
  }
}
