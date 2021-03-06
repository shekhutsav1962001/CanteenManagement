import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-oneorderview',
  templateUrl: './oneorderview.component.html',
  styleUrls: ['./oneorderview.component.css']
})
export class OneorderviewComponent implements OnInit {

  public id:any;
  public errorMessage: any;
  public styl: any;

  items: any[];
  total: any;
  arr: any[];
  public loading:any= true;
  constructor(private authService: AuthService, private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.loading = true;
    this.check()
    this.getData()
  }

  getData()
  {
    this.id=this.adminService.getOrderid()
    if(this.id==undefined)
    {
      this.router.navigate(['/admin/adminhome'])
    }
    else
    {
      this.adminService.getOneOrder(this.id).subscribe(
        data => {

            ////console.log(data);
            this.arr = data[0];
            if (this.arr == undefined) {
              this.router.navigate(['/admin/adminhome']);
            }
            else {
              this.loading = false;
              this.items = this.arr['items'];
              this.total = this.arr['total'];
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
          ////console.log(error);
        }
      )
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
        ////console.log(data);
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          this.authService.logoutUser();
          this.router.navigate(['/error'])
        }
        ////console.log(error);
      }
    )
  }
}
