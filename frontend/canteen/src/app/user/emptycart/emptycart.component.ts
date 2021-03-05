import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-emptycart',
  templateUrl: './emptycart.component.html',
  styleUrls: ['./emptycart.component.css']
})
export class EmptycartComponent implements OnInit {
  public count:any;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    if(this.authService.getCount()==undefined || this.authService.getCount()!=0)
    {
      this.router.navigate(['/userhome']);
    }
    this.check();

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
