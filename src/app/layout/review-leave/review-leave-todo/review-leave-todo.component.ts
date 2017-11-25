import { Component, OnInit } from '@angular/core';
import {LeaveDomain} from "../../../data/leaveDomain";
import {LeaveService} from "../../../service/leave.service";
import {LEAVE_LIST} from "../../../data/leaveList";
import {STATUS_LIST} from "../../../data/statusDomain";

@Component({
  selector: 'app-review-leave-todo',
  templateUrl: './review-leave-todo.component.html',
  styleUrls: ['./review-leave-todo.component.css']
})
export class ReviewLeaveTodoComponent implements OnInit {

  // 元数据
  leaveList: LeaveDomain[];
  statusList: string[];

  // 表格变量
  _current = 1;
  _pageSize = 10;
  _total = 1;
  _dataSet = [];
  _loading = true;

  // 提示框变量
  isVisible = false;
  isConfirmLoading = false;

  json = JSON;
  model_data;


  constructor(private leaveService: LeaveService) { }

  ngOnInit() {
    this.leaveList = LEAVE_LIST;
    this.statusList = STATUS_LIST;
    this.refreshData();
  }

  /**
   * 刷新表格数据
   * @param reset
   */
  refreshData(reset = false) {
    if (reset) {
      this._current = 1;
    }
    this._loading = true;

    this.leaveService.firstCall().subscribe(data1 => {
    });
    this.leaveService.getReviewTodoList("Jack", this._current, this._pageSize).subscribe((data: any) => {
      this._loading = false;
      this._total = data.data.total;
      this._dataSet = data.data.list;
    });
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
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  /**
   * 面板 取消 (Modal)
   * @param e
   */
  handleCancel = (e) => {
    this.isVisible = false;
  }

}
