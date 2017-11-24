import { Component, OnInit } from '@angular/core';
import {LeaveService} from "../../service/leave.service";

import {LEAVE_LIST} from "../../data/leaveList";
import {STATUS_LIST} from "../../data/statusDomain";
import {LeaveDomain} from "../../data/leaveDomain";
import {NzModalService} from "ng-zorro-antd";

@Component({
  selector: 'app-ask-leave-draft',
  templateUrl: './ask-leave-draft.component.html',
  styleUrls: ['./ask-leave-draft.component.css']
})
export class AskLeaveDraftComponent implements OnInit {

  leaveList: LeaveDomain[];
  statusList: string[];

  isVisible = false;
  isConfirmLoading = false;
  modal_data;
  json = JSON;

  _current = 1;
  _pageSize = 10;
  _total = 1;
  _dataSet = [];
  _loading = true;


  constructor(private leaveService: LeaveService,
              private confirmServ: NzModalService) {
  }

  refreshData(reset = false) {
    if (reset) {
      this._current = 1;
    }
    this._loading = true;

    this.leaveService.firstCall().subscribe(data1 => {
    });
    this.leaveService.getLeaveDraft("Jack", this._current, this._pageSize).subscribe((data: any) => {
      this._loading = false;
      this._total = data.data.total;
      this._dataSet = data.data.list;
    });
  }

  ngOnInit() {
    this.leaveList = LEAVE_LIST;
    this.statusList = STATUS_LIST;
    this.refreshData();
  }

  showConfirm = (data) => {
    this.confirmServ.confirm({
      title  : '警告',
      content: '<b>确认删除' + data['applyUserName'] + '?删除后不可恢复</b>',
      showConfirmLoading: true,
      onOk() {
        return new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
      },
      onCancel() {
      }
    });
  }

  showModal = (data) => {
    this.isVisible = true;
    this.modal_data = data;
  }

  handleOk = (e) => {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  handleCancel = (e) => {
    this.isVisible = false;
  }


}
