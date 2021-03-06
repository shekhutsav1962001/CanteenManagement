import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-viewfeedback',
  templateUrl: './viewfeedback.component.html',
  styleUrls: ['./viewfeedback.component.css']
})
export class ViewfeedbackComponent implements OnInit {

  public items: any[];
  public errorMessage: any;
  public styl: any;
  public empty: any = false;
  public loading:any= true;
  constructor(private authService: AuthService, private router: Router, private adminService: AdminService) { }


  ngOnInit(): void {
    this.loading = true;
    this.check();
    this.getData();
  }

  getData() {
    this.adminService.getAllfeedback().subscribe(
      data => {
        if (data['msg']) {
          this.loading =  false;
          this.items = data['msg'];
          if (this.items.length == 0) {
            this.empty = true;
          }
          else
          {
            this.empty = false;
          }
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

  setMessage(msg: any, color: any) {
    this.errorMessage = msg;
    this.styl = {
      backgroundColor: color,
    }
    setTimeout(() => {
      this.errorMessage = null;
    }, 4000);
  }

  viewuser(item) {
    this.adminService.setUserid(item.userid);
    this.router.navigate(['/admin/viewuser'])
  }

  deletefeedback(item) {
    // //console.log("delete");
    //console.log(item);
    this.loading = true
    this.adminService.deleteFeedback(item._id).subscribe(
      data => {
        if (data['msg']) {
          this.loading = false;
          this.setMessage("successfully feedback deleted", "#f04747");
          this.getData();
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
}
