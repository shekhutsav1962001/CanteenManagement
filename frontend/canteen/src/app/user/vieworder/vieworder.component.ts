import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-vieworder',
  templateUrl: './vieworder.component.html',
  styleUrls: ['./vieworder.component.css']
})
export class VieworderComponent implements OnInit {

  public id:any;
  public errorMessage: any;
  public styl: any;

  items: any[];
  total: any;
  arr: any[];
  public loading:any= true;
  constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.check()
    this.getData()
    this.loading = true
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

  getData()
  {
    this.id=this.userService.getOrderid()
    if(this.id==undefined)
    {
      this.router.navigate(['/myorders'])
    }
    else
    {
      this.userService.getOneOrder(this.id).subscribe(
        data => {

            //console.log(data);
            this.arr = data[0];
            if (this.arr == undefined) {
              this.router.navigate(['/myorders']);
            }
            else {
              this.loading = false
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
          //console.log(error);
        }
      )
    }
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
}
