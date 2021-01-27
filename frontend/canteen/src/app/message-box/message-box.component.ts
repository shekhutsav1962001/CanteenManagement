import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {

  @Input() message: any;
  @Input() styl:any
  constructor() { }


  ngOnInit(): void {
    $(document).ready(function () {
      $('.box').fadeOut(4000);
    });
  }

}
