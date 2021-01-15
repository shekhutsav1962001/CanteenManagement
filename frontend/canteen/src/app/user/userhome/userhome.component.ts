import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

  public fooditems: any[];
  public len: any;
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
}
