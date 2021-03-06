import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-oneuserview',
  templateUrl: './oneuserview.component.html',
  styleUrls: ['./oneuserview.component.css']
})
export class OneuserviewComponent implements OnInit {

  public id: any;
  public errorMessage: any;
  public styl: any;

  public user: any;
  public name: any;
  public email: any;
  public contact: any;
  public loading:any= true;
  constructor(private authService: AuthService, private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.loading = true;
    this.check()
    this.getData()
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

  getData() {
    this.id = this.adminService.getUserid()
    if (this.id == undefined) {
      this.router.navigate(['/admin/adminhome'])
    }
    else {
      this.adminService.getOneUser(this.id).subscribe(
        data => {
          if (data['msg']) {
            this.loading = false;
            this.user = data['msg']
            this.name = this.user['name']
            this.email = this.user['email']
            this.contact = this.user['contact']
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
}
