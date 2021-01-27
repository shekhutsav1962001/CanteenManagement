import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password-done',
  templateUrl: './reset-password-done.component.html',
  styleUrls: ['./reset-password-done.component.css']
})
export class ResetPasswordDoneComponent implements OnInit {

  msg: any = [];
  avail: boolean;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmitResetpasswordDone(f: NgForm) {


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

    this.authService.resetpassworddone(JSON.stringify(f.value))
      .subscribe(
        data => {
          if (data['msg']) {
            this.msg = data['msg'];
            this.avail = true;
            return;
          }
          else {
            this.authService.setMessage("Successfully Reset Password done!!", "#43b581");
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
