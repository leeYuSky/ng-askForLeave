import { Component, OnInit } from '@angular/core';
import {STATUS_LIST} from "../../../data/statusDomain";
import {LeaveService} from "../../../service/leave.service";
import {CheckUserService} from "../../../service/check-user.service";

@Component({
  selector: 'app-ask-overtime-done',
  templateUrl: './ask-overtime-done.component.html',
  styleUrls: ['./ask-overtime-done.component.css']
})
export class AskOvertimeDoneComponent implements OnInit {

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
  model_data;

  current_user;

  constructor(private leaveService: LeaveService,
              private checkUserService: CheckUserService) {}

  ngOnInit() {

    this.statusList = STATUS_LIST;

    if (this.checkUserService.isLogin) {
      this.current_user = this.checkUserService.current_user;
      this.refreshData();
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
      this.leaveService.getOvertimeDone(this.current_user, this._current, this._pageSize).subscribe((data: any) => {
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
