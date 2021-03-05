import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  msg: any = [];
  avail: boolean;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }
  onSubmitForgot(f: NgForm) {
    //console.log("f submit");
    this.authService.reset(JSON.stringify(f.value))
      .subscribe(
        data => {
          // //console.log(data);
          if (data['msg']) {
            this.msg = data['msg'];
            this.avail = true;
            return;
          }
          else {
            this.router.navigate(['/reset-password']);
          }

        },
        error => {
          console.error(error);
          this.router.navigate(['/error']);
        }
      )
  }
}
