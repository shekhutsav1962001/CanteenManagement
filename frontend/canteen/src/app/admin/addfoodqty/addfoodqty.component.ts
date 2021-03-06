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
  public errorMessage: any;
  public styl :any;
  public loading:any= true;
  constructor(private authService: AuthService, private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.loading = true;
    this.check();
    if (this.adminService.getFood()) {
      this.loading = false;
      this.food = this.adminService.getFood();
    }
    else {
      this.router.navigate(['/admin/seefood'])
    }
  }


  check() {
    this.authService.check().subscribe(
      data => {
        // console.log(data);
        if (data['msg']) {
          // console.log(data['msg']);
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
        // console.log(error);
      }
    )
  }

  onSubmit(f) {
    if(this.food.foodqty<0)
    {
      this.food.foodqty=0;
    }
    this.adminService.editfood(this.food).subscribe(
      data => {
        // console.log(data);
        if (data['msg']) {
          // console.log(data['msg']);
          this.authService.setMessage("successfully quantity updated", "#43b581");
          this.router.navigate(['/admin/seefood'])
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
        // console.log(error);
      }
    )
  }
  qtychnage(event) {
    if (event.target.value < 0) {
      event.target.value= 0;
      this.food.foodqty = 0;
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

}
