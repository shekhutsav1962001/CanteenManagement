import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  public name: any;
  public contact: any;
  public email: any;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.check();
    this.getData();
  }
  getData() {
    this.name = "utsav";
    this.email = "shekhutsav1962001@gmail.com";
    this.contact = "7434069974"
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
  gotoChangepassword() {
    localStorage.removeItem('userid');
    localStorage.removeItem('admin');
    localStorage.removeItem('user');
    this.router.navigate(['/change-password'])
  }
  gotoEditprofile() {
    this.router.navigate(['/editprofile'])
  }
}
