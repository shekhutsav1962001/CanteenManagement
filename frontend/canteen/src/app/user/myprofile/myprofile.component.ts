import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  public name: any;
  public contact: any;
  public email: any;
  public user: any;
  public errorMessage: any;
  public styl: any;
  public loading: any = true;
  constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.check();
    this.loading = true
    this.getData();
    if (this.authService.getMessage()) {
      var x = this.authService.getMessage();
      this.setMessage(x.msg, x.color)
    }
  }
  getData() {
    this.userService.myprofile().subscribe(
      data => {
        // //console.log(data);
        if (data['user']) {
          this.loading = false
          this.user = data['user'];
          this.name = this.user.name;
          this.email = this.user.email;
          this.contact = this.user.contact;
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
  gotoChangepassword() {
    localStorage.removeItem('admin');
    localStorage.removeItem('user');
    this.router.navigate(['/change-password'])
  }
  gotoEditprofile() {
    this.router.navigate(['/editprofile'])
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
