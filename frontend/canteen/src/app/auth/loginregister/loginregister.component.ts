import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-loginregister',
  templateUrl: './loginregister.component.html',
  styleUrls: ['./loginregister.component.css']
})
export class LoginregisterComponent implements OnInit {

  msg: any = [];
  avail: boolean;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    $(document).ready(function () {

      $("#sign-in-btn").click(function () {

        $(".containerr").removeClass("sign-up-mode");

      });

      $("#sign-up-btn").click(function () {
        $(".containerr").addClass("sign-up-mode");

      });

    });
  }

  onSubmitRegister(f: NgForm) {


    if (f.controls.p1.value != f.controls.p2.value) {
      this.msg = "Password   doesn't match";
      this.avail = true;
      return;
    }

    if (!f.valid) {
      this.msg = "Invalid Form Fields";
      this.avail = true;
      return;
    }

    this.authService.register(JSON.stringify(f.value))
      .subscribe(
        data => {
          if (data['msg']) {
            this.msg = data['msg'];
            this.avail = true;
            return;
          }
          if (data['message']) {
            this.router.navigate(['/']);
          }
        },
        error =>
        {
          console.error(error);
          this.router.navigate(['/error']);
        }

      )
  }

  onSubmitLogin(f: NgForm) {


    if (!f.valid) {
      this.msg = "Invalid Email or Password";
      this.avail = true;
      return;
    }


    this.authService.login(JSON.stringify(f.value))
      .subscribe(
        data => {
          console.log(data);
          if (data['msg']) {
            this.msg = data['msg'];
            this.avail = true;
            return;
          }
          if (data['role'] == "admin") {
            console.log("admin");
            localStorage.setItem('token', data['token']);

            // localStorage.setItem('userid', f.controls.email.value);
            localStorage.setItem('admin', 'yes');
            localStorage.setItem('user', 'no');
            this.router.navigate(['/admin/adminhome']);

          }
          else {
            console.log("user");
            if (data['blocked'] == true) {
              this.msg = "You are blocked by Admin wait until admin unblock you!!!";
              this.avail = true;
              return;
            }
            else {
              localStorage.setItem('token', data['token']);

              localStorage.setItem('userid', f.controls.email.value);
              localStorage.setItem('admin', 'no');
              localStorage.setItem('user', 'yes');
              this.router.navigate(['/userhome']);
            }

          }

        },
        error =>
        {
          console.error(error);
          this.router.navigate(['/error']);
        }
      )
  }

  signinup() {
    this.msg = "";
    this.avail = false;
  }


}
