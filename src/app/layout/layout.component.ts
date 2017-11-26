import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LeaveService} from "../service/leave.service";
import {UserInfoComponent} from "./user-info/user-info.component";

import {CheckUserService} from "../service/check-user.service";


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  isCollapsed = true;


  constructor(private route: ActivatedRoute,
              private leaveService: LeaveService,
              private checkUserService: CheckUserService){}

  ngOnInit() {
    console.log("LayoutComponent ngOnInit");

    console.log("登录了吗?" + this.checkUserService.isLogin);

  }

  log(msg: string){
    console.log(msg);
  }

}
