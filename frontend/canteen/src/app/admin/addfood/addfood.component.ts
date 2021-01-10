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
        console.log(data);
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

  onSubmit(f: NgForm) {

    const formData = new FormData();
    formData.append('file', this.image);
    formData.append('foodname', f.controls.foodname.value);
    formData.append('foodprice', f.controls.foodprice.value);
    this.adminService.addfood(formData).subscribe(
      data => {
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

  selectImage(event) {
    console.log("image selected");
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
    }
  }
}
