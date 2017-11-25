import {Component, OnInit, ViewChild} from '@angular/core';
import {LeaveService} from "../../../service/leave.service";

import {LEAVE_LIST} from "../../../data/leaveList";
import {STATUS_LIST} from "../../../data/statusDomain";
import {LeaveDomain} from "../../../data/leaveDomain";
import {NzModalService} from "ng-zorro-antd";
import {NzMessageService} from 'ng-zorro-antd';
import {AskLeaveUpdateFormComponent} from "../ask-leave-update-form/ask-leave-update-form.component";

@Component({
  selector: 'app-ask-leave-draft',
  templateUrl: './ask-leave-draft.component.html',
  styleUrls: ['./ask-leave-draft.component.css']
})
export class AskLeaveDraftComponent implements OnInit {

  // 元数据
  leaveList: LeaveDomain[];
  statusList: string[];

  // 提示框变量
  isVisible = false;
  isConfirmLoading = false;
  modal_data;
  json = JSON;

  @ViewChild(AskLeaveUpdateFormComponent) formUpdateChild: AskLeaveUpdateFormComponent;

  // 表格变量
  _current = 1;
  _pageSize = 10;
  _total = 1;
  _dataSet = [];
  _loading = true;


  constructor(private leaveService: LeaveService,
              private confirmServ: NzModalService,
              private  nzMessageService: NzMessageService) {
  }

  /**
   * 初始化钩子函数
   */
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
    this.leaveService.getLeaveDraft("Jack", this._current, this._pageSize).subscribe((data: any) => {
      this._loading = false;
      this._total = data.data.total;
      this._dataSet = data.data.list;
    });
  }


  /**
   * 显示 删除 提示框
   * @param data
   */
  showConfirm = (data) => {
    let constance = this;
    let model = this.confirmServ.confirm({
      title  : '警告',
      content: '<b>确认删除该条数据?删除后不可恢复</b>',
      showConfirmLoading: true,
      onOk() {
        return new Promise((resolve, reject) => {
          constance.leaveService.deleteLeave(data['id']).subscribe(
          data => {
            if (data['errno'] === 0) {
              resolve();
              constance.nzMessageService.create('success', `删除成功`);
              constance.refreshData();
            } else {
              resolve();
              constance.nzMessageService.create('error', `删除失败`);
            }

          },
          err => {
            reject();
            constance.nzMessageService.create('error', `删除失败`);
          });
        });

      },
      onCancel() {
      }
    });
  }


  /**
   * 显示 修改编辑 提示框
   * @param data
   */
  showModal = (data) => {
    this.isVisible = true;
    this.modal_data = data;
  }

  /**
   * 确认修改
   * @param e
   */
  handleOk = (e) => {
    if (!this.formUpdateChild.confirmFormForParen()){
      return;
    }
    this.isConfirmLoading = true;

    this.formUpdateChild.submitFormForParent().subscribe(
      data => {
        if (data['errno'] === 0) {
          this.nzMessageService.create('success', `修改成功`);
          if (this.formUpdateChild.getStatusForParent() === 1) {
            this.refreshData();
          } else {
            this.refreshData();
          }

        } else {
          this.nzMessageService.create('error', `修改失败`);
        }
        this.isVisible = false;
        this.isConfirmLoading = false;

      },
      err => {
        this.nzMessageService.create('error', `修改失败`);
        this.isVisible = false;
        this.isConfirmLoading = false;
      }
    );


  }

  /**
   * 取消修改
   * @param e
   */
  handleCancel = (e) => {
    this.isVisible = false;
    this.formUpdateChild.resetFormForParent();
  }


}
