import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-addfoodqty',
  templateUrl: './addfoodqty.component.html',
  styleUrls: ['./addfoodqty.component.css']
})
export class AddfoodqtyComponent implements OnInit {
  public food: any;
  constructor(private authService: AuthService, private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.check();
    if (this.adminService.getFood()) {
      this.food = this.adminService.getFood();
    }
    else {
      this.router.navigate(['/admin/seefood'])
    }
  }


  check() {
    this.authService.check().subscribe(
      data => {
        console.log(data);
        if (data['msg']) {
          console.log(data['msg']);
        }
        else {
          this.authService.logoutUser();
          this.router.navigate(['/error'])
        }
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

  onSubmit(f) {
    console.log(this.food);
    this.adminService.editfood(this.food).subscribe(
      data => {
        console.log(data);
        if (data['msg']) {
          // console.log(data['msg']);
          this.router.navigate(['/admin/seefood'])
        }
        else {
          this.authService.logoutUser();
          this.router.navigate(['/error'])
        }
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
  qtychnage(event) {
    if (event.target.value < 0) {
      event.target.value= "";
    }
  }

}
