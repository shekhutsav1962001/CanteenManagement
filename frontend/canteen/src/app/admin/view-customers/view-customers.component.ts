import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrls: ['./view-customers.component.css']
})
export class ViewCustomersComponent implements OnInit {

  public users: any[];
  public errorMessage: any;
  public styl: any;
  public loading:any= true;
  constructor(private authService: AuthService, private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.loading = true;
    this.check();
    this.getData();
  }

  getData() {
    this.adminService.getAlluser().subscribe(
      data => {
        if (data['user']) {
          this.loading = false;
          this.users = data['user'];
          //console.log(data);
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


  block(user) {
    var userid = user._id;
    this.adminService.blockuser(userid).subscribe(
      data => {
        if (data['msg']) {
          this.setMessage("successfully blocked user", "#f04747");
        }
        if (data['errormsg']) {
          this.setMessage(data['errormsg'], "#f04747");
        }
        this.getData();
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

  unblock(user) {
    var userid = user._id;
    this.adminService.unblockuser(userid).subscribe(
      data => {
        if (data['msg']) {
          this.setMessage("successfully unblocked user", "#43b581");
        }
        if (data['errormsg']) {
          this.setMessage(data['errormsg'], "#f04747");
        }
        this.getData();
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
