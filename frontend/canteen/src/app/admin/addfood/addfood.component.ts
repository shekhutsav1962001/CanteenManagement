import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-addfood',
  templateUrl: './addfood.component.html',
  styleUrls: ['./addfood.component.css']
})
export class AddfoodComponent implements OnInit {
  image;
  foodname:any;
  foodprice:any;
  foodqty:any;
  public errorMessage: any;
  public styl :any;
  constructor(private authService: AuthService, private router: Router,private adminService: AdminService) { }



  ngOnInit(): void {
    $(document).ready(function () {
      $('.image-input').change(function (e) {
        $('#filename').text(e.target.value.split('\\').pop());
      });
    });
    this.check()
  }
  check() {
    this.authService.check().subscribe(
      data => {
        // console.log(data);
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          this.authService.logoutUser();
          this.router.navigate(['/error'])
        }
        // console.log("object");
        // console.log(error);
      }
    )
  }

  onSubmit(f: NgForm) {

    this.foodname =f.controls.foodname.value;
    this.foodprice =f.controls.foodprice.value;
    this.foodqty = f.controls.foodqty.value;
    if(this.foodprice==0)
    {
      this.foodprice=1;
    }
    if(this.foodqty<-1)
    {
      this.foodqty=0;
    }
    const formData = new FormData();
    formData.append('file', this.image);
    formData.append('foodname', this.foodname);
    formData.append('foodprice', this.foodprice);
    formData.append('foodqty', this.foodqty);
    // console.log(formData);
    this.adminService.addfood(formData).subscribe(
      data => {
        if (data['msg']) {
          // console.log(data['msg']);
          this.authService.setMessage("successfully item added", "#43b581");
          this.router.navigate(['/admin/seefood'])
        }
        if (data['errormsg']) {
          this.setMessage(data['errormsg'], "#f04747");
        }
        // console.log(data);
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
    // console.log("image selected");
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
    }
  }

  qtychnage(event) {
    if (event.target.value < -1) {
      event.target.value= 0;
      this.foodqty=0;
    }
  }

  pricechnage(event) {
    if(event.target.value == "")
    {
      event.target.value= "";
      this.foodprice="";
    }
    if (event.target.value <= 0 && event.target.value!="") {
      event.target.value= 1;
      this.foodprice=1;
    }
  }

  setMessage(msg:any,color:any)
  {
    this.errorMessage = msg;
    this.styl = {
      backgroundColor: color,
    }
    setTimeout(() => {
      this.errorMessage = null;
    }, 4000);
  }
}
