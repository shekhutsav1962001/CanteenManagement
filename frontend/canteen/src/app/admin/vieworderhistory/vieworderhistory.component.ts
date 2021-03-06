import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-vieworderhistory',
  templateUrl: './vieworderhistory.component.html',
  styleUrls: ['./vieworderhistory.component.css']
})
export class VieworderhistoryComponent implements OnInit {

  public errorMessage: any;
  public styl: any;
  public fooditems: any[];
  public date: any;
  public maxDate: any;
  public total: any = 0;
  public empty: any = false;
  public loading: any = true;
  constructor(private authService: AuthService, private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.loading = true;
    var today = new Date();
    this.date = today.toJSON().slice(0, 10);
    this.maxDate = today.toJSON().slice(0, 10);
    this.check();
    this.getOrder();
  }


  getOrder() {
    if (this.date) {
      this.adminService.getOrderHistory(this.date).subscribe(
        data => {
          if (data['msg']) {
            this.loading = false;
            this.fooditems = data['msg'];
            this.total = data['total']
            //console.log(this.fooditems);
            //console.log(this.total);
            if (this.total == 0) {
              this.empty = true;
            }
            else {
              this.empty = false;
            }
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
    else {
      this.setMessage("Please choose a date", "#f04747");
    }

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

  changeDate() {
    if (this.date) {
      this.loading = true;
      this.getOrder()
    }
    else {
      this.setMessage("Please choose a date", "#f04747");
    }
  }
}
