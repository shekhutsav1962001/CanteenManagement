import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  public name: any;
  public contact: any;
  public email: any;
  public user: any;
  constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.check();
    this.getData();
  }

  getData() {
    this.userService.myprofile().subscribe(
      data => {
        // console.log(data);
        this.user = data['user'];
        this.name = this.user.name;
        this.email = this.user.email;
        this.contact = this.user.contact;
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

  onSubmit(f: NgForm) {
    this.userService.editprofile(JSON.stringify(f.value))
      .subscribe(
        data => {
          if (data['msg']) {
            if (data['emailchange'] == "yes") {
              this.authService.logoutUser();
              this.router.navigate(['/'])
            }
            else {
              this.router.navigate(['/myprofile'])
            }
          }
          else {
            this.authService.logoutUser();
            this.router.navigate(['/error'])
          }
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
