import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LeaveService} from "../service/leave.service";
import {UserInfoComponent} from "./user-info/user-info.component";

import {CheckUserService} from "../service/check-user.service";
import {NzMessageService} from "ng-zorro-antd";


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  isCollapsed = true;


  constructor(private router: Router,
              private leaveService: LeaveService,
              private checkUserService: CheckUserService,
              private nzMessageService: NzMessageService ){}

  ngOnInit() {
    console.log("LayoutComponent ngOnInit");

    // console.log("登录了吗?" + this.checkUserService.isLogin);

  }

  logout(){
    if (this.checkUserService.isLogin) {

      this.leaveService.logout().subscribe(
        data => {
          if (data["errno"] === 0) {
            this.checkUserService.logout();
            this.router.navigate(['login']);
          } else {
            this.nzMessageService.create("error", "登出失败");
          }
        },
        err => {
          this.nzMessageService.create("error", "未知错误");
        }
      );
    } else {
      this.nzMessageService.create("error", "未登录");
    }
  }

  log(msg: string){
    console.log(msg);
  }

}
