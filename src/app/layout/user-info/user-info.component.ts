import { Component, OnInit } from '@angular/core';
import {LeaveService} from "../../service/leave.service";
import {ActivatedRoute} from "@angular/router";
import {CheckUserService} from "../../service/check-user.service";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  current_user;
  current_name;
  current_department;
  current_manager;
  current_annualLeft;
  current_annualTotal;
  _annualLeft = 0;

  constructor(private route: ActivatedRoute,
              private leaveService: LeaveService,
              private checkUserService: CheckUserService) { }

  ngOnInit() {

    console.log("UserInfoComponent登录了吗?" + this.checkUserService.isLogin);
    if (this.checkUserService.isLogin) {
      this.current_user = this.checkUserService.current_user;

      this.leaveService.getUserInfo(this.current_user).subscribe(
        data => {
          if (data['errno'] === 0){
            this.current_name = data['data']['name'];
            this.current_department = data['data']['department'];
            this.current_manager = data['data']['manager'];
            this.current_annualLeft = data['data']['annualLeft'];
            this.current_annualTotal = data['data']['annualTotal'];
            this._annualLeft = Math.floor(this.current_annualLeft / this.current_annualTotal * 100);
          } else {

          }
        },
        err => {
        }
      );

    }

  }

  _formatOne = percent => `${percent} %`;

}
