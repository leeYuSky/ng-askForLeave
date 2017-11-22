import { Component, OnInit } from '@angular/core';

import { LeaveDomain } from "../../data/leaveDomain";
import { LEAVE_LIST } from "../../data/leaveList";

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  tabs: LeaveDomain[];



  constructor() { }

  ngOnInit() {
    this.tabs = LEAVE_LIST;
  }

}
