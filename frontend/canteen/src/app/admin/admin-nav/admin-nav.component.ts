import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    $(document).ready(function () {


      $(window).scroll(function () {
        var scrPos = $(this).scrollTop();
        if (scrPos > 325) {
          $("#mybtn").css({ "display": "block" });
        }
        else {
          $("#mybtn").css({ "display": "none" });
        }

        
      });


    });
  }

  logoutuser()
  {
    this.authService.logoutUser();
    this.router.navigate(['/']);
  }
}
