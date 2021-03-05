import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as $ from 'jquery';
import { WebsocketService } from 'src/app/services/websocket.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {
  public count = 0;
  public errorMessage: any;
  public styl: any;
  constructor(private authService: AuthService, private router: Router, private webSocketService: WebsocketService,private userService: UserService) { }

  ngOnInit(): void {
    this.getData();

    this.webSocketService.listen('cart').subscribe(
      (data) => {
        //console.log(data);
        this.getData();
      }
    )
    this.webSocketService.listen('neworderplaced').subscribe(
      (data) => {
        this.getData();
      }
    )
    $(document).ready(function () {


      $(window).scroll(function () {
        var scrPos = $(this).scrollTop();
        if (scrPos > 325) {
          $("#mybtn").css({ "display": "block" });
        }
        else {
          $("#mybtn").css({ "display": "none" });
        }


      });


    });
  }
  getData() {
    this.userService.getCount().subscribe(
      data => {
        // //console.log(data);
        if(data['count'])
        {
          this.count = data['count'];
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
  logoutuser() {
    this.authService.logoutUser();
    this.router.navigate(['/']);
  }

  cnt()
  {
    this.authService.setCount(this.count);
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
