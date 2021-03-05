import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  msg: any = [];
  avail: boolean;
  constructor(private router: Router, private authService: AuthService) { }


  ngOnInit(): void {
    this.check()
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

  onSubmitChangePassword(f: NgForm) {


    if (!f.valid) {
      this.msg = "Invalid form data!!";
      this.avail = true;
      return;
    }

    if (f.controls.p1.value != f.controls.p2.value) {
      this.msg = "Password doesn't match";
      this.avail = true;
      return;
    }

    this.authService.changepassword(JSON.stringify(f.value))
      .subscribe(
        data => {
          if (data['msg'] != "changed password") {
            this.msg = data['msg'];
            this.avail = true;
            return;
          }
          else {
            this.authService.setMessage("successfully password changed!!", "#43b581");
            this.authService.logoutUser();
            this.router.navigate(['/']);
          }
        },
        error => {
          console.error(error);
          this.router.navigate(['/error']);
        }
      )
  }
}
