import { Component, OnInit } from '@angular/core';
import {LeaveDomain} from "../../../data/leaveDomain";
import {LeaveService} from "../../../service/leave.service";
import {LEAVE_LIST} from "../../../data/leaveList";
import {STATUS_LIST} from "../../../data/statusDomain";
import {CheckUserService} from "../../../service/check-user.service";

@Component({
  selector: 'app-review-leave-done',
  templateUrl: './review-leave-done.component.html',
  styleUrls: ['./review-leave-done.component.css']
})
export class ReviewLeaveDoneComponent implements OnInit {

// 元数据
  leaveList: LeaveDomain[];
  statusList: string[];

  // 表格变量
  _current = 1;
  _pageSize = 10;
  _total = 1;
  _dataSet = [];
  _loading = false;

  // 提示框变量
  isVisible = false;
  isConfirmLoading = false;

  json = JSON;
  model_data;
  current_user;

  constructor(private leaveService: LeaveService,
              private checkUserService: CheckUserService) { }

  ngOnInit() {
    this.leaveList = LEAVE_LIST;
    this.statusList = STATUS_LIST;
    if (this.checkUserService.isLogin) {
      this.current_user = this.checkUserService.current_user;
      this.refreshData();
    }
  }

  /**
   * 判断申请类别, 是 请假 还是 加班
   * @param type
   * @returns {any}
   */
  getType(type){
    if (type === 10){
      return "加班";
    } else {
      return this.leaveList[type - 1].name;
    }
  }

  /**
   * 刷新表格数据
   * @param reset
   */
  refreshData(reset = false) {
    if (this.checkUserService.isLogin) {

      if (reset) {
        this._current = 1;
      }
      this._loading = true;

      this.leaveService.getReviewDoneList(this.current_user, this._current, this._pageSize).subscribe((data: any) => {
        this._loading = false;
        this._total = data.data.total;
        this._dataSet = data.data.list;
      });
    }
  }

  /**
   * 查看 时间线 的面板 (Modal)
   * @param data
   */
  showModal = (data) => {
    this.isVisible = true;
    this.model_data = data;
  }

  /**
   * 面板 确认 (Modal)
   * @param e
   */
  handleOk = (e) => {
    // this.isConfirmLoading = true;
    // setTimeout(() => {
    //   this.isVisible = false;
    //   this.isConfirmLoading = false;
    // }, 3000);
    this.isVisible = false;
  }

  /**
   * 面板 取消 (Modal)
   * @param e
   */
  handleCancel = (e) => {
    this.isVisible = false;
  }

}
