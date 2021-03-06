import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-editfood',
  templateUrl: './editfood.component.html',
  styleUrls: ['./editfood.component.css']
})
export class EditfoodComponent implements OnInit {
  public food: any;
  image;
  public isitavail:any;
  public errorMessage: any;
  public styl :any;
  public loading:any= true;
  constructor(private authService: AuthService, private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    $(document).ready(function () {
      $('.image-input').change(function (e) {
        $('#filename').text(e.target.value.split('\\').pop());
      });
    });
    this.check();
    this.loading = true;
    if (this.adminService.getFood()) {
      this.loading = false;
      this.food = this.adminService.getFood();
      // console.log(this.food);
      if(this.food.foodavail)
      {
        this.isitavail = "yes";
      }
      else
      {
        this.isitavail = "no";
      }
      this.food.isitavail = this.isitavail;
    }
    else {
      this.router.navigate(['/admin/seefood'])
    }
  }

  // edit() {

  // }
  qtychnage(event) {

    if (event.target.value < 0) {
      this.food.foodqty = 0;
      event.target.value = 0;
    }
  }

  pricechnage(event) {
    if (event.target.value == "") {
      event.target.value = "";
      this.food.foodprice = "";
    }
    if (event.target.value <= 0 && event.target.value != "") {
      event.target.value = 1;
      this.food.foodprice = 1;
    }
  }

  onSubmit(f) {
    // console.log("submit");

    if (f.controls.foodpic.value) {
      // console.log("yes image");
      // console.log(this.food);

      const formData = new FormData();
      formData.append('file', this.image);
      formData.append('foodname', f.controls.foodname.value);
      formData.append('foodprice', f.controls.foodprice.value);
      if(this.food.unlimited)
      {
        formData.append('foodqty',this.food.foodqty);
      }
      else
      {
        formData.append('foodqty', f.controls.foodqty.value);
      }
      formData.append('_id', this.food._id);
      formData.append('isitavail', this.isitavail);
      this.adminService.editfoodwithimage(formData).subscribe(
        data => {
          if (data['msg']) {
            // console.log(data['msg']);
            this.authService.setMessage("successfully item updated", "#43b581");
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
    else {
      // console.log("no image");
      // console.log(this.food);
      this.adminService.editfood(this.food).subscribe(
        data => {
          // console.log(data);
          if (data['msg']) {
            // console.log(data['msg']);
            this.authService.setMessage("successfully item updated", "#43b581");
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


  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
    }
  }

  changeisitAvail()
  {
    if(this.isitavail=="yes")
    {
      this.isitavail="no";
    }
    else
    {
      this.isitavail="yes";
    }
    // console.log(this.isitavail);
    this.food.isitavail = this.isitavail;
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
