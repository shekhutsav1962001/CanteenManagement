import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(document).ready(function () {

        // $('html, body').animate({
        //   scrollTop: $("#famousfood").offset().top
        // }, 2000);



      $(window).scroll(function () {
        var scrPos = $(this).scrollTop();
        // console.log(scrPos);
        if (scrPos > 425) {
          $("#mybtn").css({ "display": "block" });
        }
        else {
          $("#mybtn").css({ "display": "none" });
        }


      });


    });
  }

}